import time
import datetime
import cv2
import collections
import threading
import asyncio
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.utils.clip_saver import save_frame, save_video_clip
from app.utils.database import add_event_to_db
from app.utils.socket_manager import manager
from app.utils.sms import send_sms_alert

from app.inference.yolo_pose import YOLODetector
from app.inference.tracker import Tracker
from app.inference.event_engine import EventEngine


# -------------------------------
# Router
# -------------------------------
router = APIRouter()

# -------------------------------
# Initialize models ONCE
# -------------------------------
model = YOLODetector()
tracker = Tracker()
engine = EventEngine()

# -------------------------------
# GLOBAL COOLDOWN CONFIG
# -------------------------------
last_alert_times = {}          # { "VIOLENCE": timestamp }
COOLDOWN_SECONDS = 5           # 1 alert per type every 5 sec

# -------------------------------
# LIVE STREAM GLOBALS
# -------------------------------
is_live_running = False
live_thread = None
current_live_frame = None

def run_live_stream():
    global is_live_running, current_live_frame
    cap = cv2.VideoCapture(0)
    
    fps = 30.0
    pre_buffer_size = int(fps * 2.0)
    post_buffer_size = int(fps * 3.0)
    
    rolling_buffer = collections.deque(maxlen=pre_buffer_size)
    record_buffer = []
    
    is_recording = False
    recording_frames_left = 0
    current_event = None

    try:
        while is_live_running and cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                time.sleep(0.1)
                continue
                
            # Mirror the webcam
            frame = cv2.flip(frame, 1)

            # 1️⃣ Detection & Tracking
            person_detections, immediate_events = model.infer(frame)
            tracks = tracker.update(person_detections, frame)

            # 2️⃣ Event Detection
            detected_events = engine.detect(tracks)
            detected_events.extend(immediate_events)
            
            anomalous_tracks = set()
            for ev in detected_events:
                anomalous_tracks.update(ev.get("tracks", []))

            # Draw bounding boxes directly on the frame for the video output
            for trk in tracks:
                if not trk.is_confirmed():
                    continue
                track_id = trk.track_id
                ltrb = trk.to_ltrb()
                x1, y1, x2, y2 = map(int, ltrb)
                
                # Red if anomalous, Cyan if normal
                color = (0, 0, 255) if track_id in anomalous_tracks else (255, 255, 0)
                
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                cv2.putText(frame, f"ID: {track_id}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            for ev in immediate_events:
                x1, y1, x2, y2 = map(int, ev["bbox"])
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 165, 255), 2) # Orange for weapon/suspicious
                cv2.putText(frame, ev["event"], (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 165, 255), 2)

            # Broadcast frame for MJPEG live feed
            ret_img, buffer = cv2.imencode('.jpg', frame)
            if ret_img:
                current_live_frame = buffer.tobytes()

            # 2️⃣ Add frame to buffer
            if not is_recording:
                rolling_buffer.append(frame.copy())
            else:
                record_buffer.append(frame.copy())
                recording_frames_left -= 1
                
                if recording_frames_left <= 0:
                    is_recording = False
                    e_type = current_event["event"]
                    video_frames = list(rolling_buffer) + record_buffer
                    video_filename = save_video_clip(video_frames, e_type, fps=fps)
                    web_video_path = f"/events/{e_type}/{video_filename}" if video_filename else None
                    
                    alert_data = {
                        "type": "NEW_ALERT",
                        "event_type": e_type,
                        "path": current_event["snapshot_path"],
                        "video_path": web_video_path,
                        "timestamp": datetime.datetime.now().strftime("%H:%M:%S")
                    }

                    # We are in a background thread, dispatch to asyncio
                    try:
                        loop = asyncio.get_event_loop()
                        if loop.is_running():
                            asyncio.run_coroutine_threadsafe(manager.broadcast(alert_data), loop)
                        else:
                            asyncio.run(manager.broadcast(alert_data))
                    except Exception as e:
                        print("Failed to broadcast from live thread:", e)
                    
                    record_buffer = []

            # (Event Detection moved up for drawing logic)
            if not detected_events:
                continue

            current_time = time.time()
            for ev in detected_events:
                e_type = ev["event"]
                last_time = last_alert_times.get(e_type, 0)
                if (current_time - last_time) < COOLDOWN_SECONDS:
                    continue
                last_alert_times[e_type] = current_time

                if not is_recording:
                    is_recording = True
                    recording_frames_left = post_buffer_size
                    
                    snapshot_filename = save_frame(frame, e_type)
                    web_snapshot_path = f"/events/{e_type}/{snapshot_filename}"
                    current_event = {
                        "event": e_type,
                        "snapshot_path": web_snapshot_path
                    }
                    
                    track_ids = ev.get("tracks", [])
                    add_event_to_db(e_type, web_snapshot_path, track_ids)
                    if e_type.upper() in ["VIOLENCE", "WEAPON_DETECTED"]:
                        send_sms_alert(e_type)

    except Exception as e:
        print(f"❌ Live Stream Error: {e}")
    finally:
        cap.release()
        is_live_running = False

@router.post("/live/start")
def start_live_stream():
    global is_live_running, live_thread
    if is_live_running:
        return {"status": "Already running"}
    
    is_live_running = True
    live_thread = threading.Thread(target=run_live_stream, daemon=True)
    live_thread.start()
    return {"status": "Live stream started"}

@router.post("/live/stop")
def stop_live_stream():
    global is_live_running
    is_live_running = False
    return {"status": "Live stream stopped"}

def generate_frames():
    global current_live_frame, is_live_running
    while is_live_running:
        if current_live_frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + current_live_frame + b'\r\n')
        time.sleep(0.03)

@router.get("/live/feed")
def live_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")


# -------------------------------
# Offline Video Endpoint
# -------------------------------
@router.post("/video")
async def process_video(path: str):
    cap = cv2.VideoCapture(path)

    if not cap.isOpened():
        raise HTTPException(status_code=400, detail="Could not open video file.")

    events = []
    
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    pre_buffer_size = int(fps * 2.0)  # 2 seconds before
    post_buffer_size = int(fps * 3.0) # 3 seconds after
    
    rolling_buffer = collections.deque(maxlen=pre_buffer_size)
    record_buffer = []
    
    is_recording = False
    recording_frames_left = 0
    current_event = None

    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # 1️⃣ Detection & Tracking
            person_detections, immediate_events = model.infer(frame)
            tracks = tracker.update(person_detections, frame)

            # 2️⃣ Event Detection
            detected_events = engine.detect(tracks)
            detected_events.extend(immediate_events)
            
            anomalous_tracks = set()
            for ev in detected_events:
                anomalous_tracks.update(ev.get("tracks", []))

            # Draw bounding boxes directly on the frame for the video output
            for trk in tracks:
                if not trk.is_confirmed():
                    continue
                track_id = trk.track_id
                ltrb = trk.to_ltrb()
                x1, y1, x2, y2 = map(int, ltrb)
                
                color = (0, 0, 255) if track_id in anomalous_tracks else (255, 255, 0)
                
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                cv2.putText(frame, f"ID: {track_id}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            for ev in immediate_events:
                x1, y1, x2, y2 = map(int, ev["bbox"])
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 165, 255), 2)
                cv2.putText(frame, ev["event"], (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 165, 255), 2)

            # 3️⃣ Add frame to buffer
            if not is_recording:
                rolling_buffer.append(frame.copy())
            else:
                record_buffer.append(frame.copy())
                recording_frames_left -= 1
                
                # If we finished recording the post-event clip
                if recording_frames_left <= 0:
                    is_recording = False
                    e_type = current_event["event"]
                    
                    # Encode and save the video clip
                    video_frames = list(rolling_buffer) + record_buffer
                    video_filename = save_video_clip(video_frames, e_type, fps=fps)
                    web_video_path = f"/events/{e_type}/{video_filename}" if video_filename else None
                    
                    # Create Alert Data
                    alert_data = {
                        "type": "NEW_ALERT",
                        "event_type": e_type,
                        "path": current_event["snapshot_path"],
                        "video_path": web_video_path,
                        "timestamp": datetime.datetime.now().strftime("%H:%M:%S")
                    }

                    await manager.broadcast(alert_data)
                    events.append(alert_data)
                    
                    record_buffer = []

            # (Event Detection moved up for drawing logic)

            if not detected_events:
                continue

            current_time = time.time()

            for ev in detected_events:
                e_type = ev["event"]

                # Cooldown check
                last_time = last_alert_times.get(e_type, 0)
                if (current_time - last_time) < COOLDOWN_SECONDS:
                    continue
                last_alert_times[e_type] = current_time

                # Start Recording!
                if not is_recording:
                    is_recording = True
                    recording_frames_left = post_buffer_size
                    
                    # Save the snapshot immediately
                    snapshot_filename = save_frame(frame, e_type)
                    web_snapshot_path = f"/events/{e_type}/{snapshot_filename}"
                    
                    current_event = {
                        "event": e_type,
                        "snapshot_path": web_snapshot_path
                    }
                    
                    # DB and SMS
                    track_ids = ev.get("tracks", [])
                    add_event_to_db(e_type, web_snapshot_path, track_ids)
                    if e_type.upper() in ["VIOLENCE", "WEAPON_DETECTED"]:
                        send_sms_alert(e_type)

    except Exception as e:
        print(f"❌ Processing Error: {e}")
        raise HTTPException(status_code=500, detail="Video processing failed")

    finally:
        cap.release()

    return {
        "status": "Processing complete",
        "total_events": len(events),
        "events": events
    }
