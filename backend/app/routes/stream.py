import time
import datetime
import cv2
from fastapi import APIRouter, HTTPException

from app.utils.clip_saver import save_frame
from app.utils.database import add_event_to_db
from app.utils.socket_manager import manager
from app.utils.sms import send_sms_alert

from app.inference.yolo_pose import YOLOPose
from app.inference.tracker import Tracker
from app.inference.event_engine import EventEngine


# -------------------------------
# Router
# -------------------------------
router = APIRouter()

# -------------------------------
# Initialize models ONCE
# -------------------------------
model = YOLOPose()
tracker = Tracker()
engine = EventEngine()

# -------------------------------
# GLOBAL COOLDOWN CONFIG
# -------------------------------
last_alert_times = {}          # { "VIOLENCE": timestamp }
COOLDOWN_SECONDS = 5           # 1 alert per type every 5 sec


@router.post("/video")
async def process_video(path: str):
    cap = cv2.VideoCapture(path)

    if not cap.isOpened():
        raise HTTPException(status_code=400, detail="Could not open video file.")

    events = []

    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # 1️⃣ Detection & Tracking
            detections = model.infer(frame)
            tracks = tracker.update(detections, frame)

            # 2️⃣ Event Detection
            detected_events = engine.detect(tracks)

            if not detected_events:
                continue

            current_time = time.time()

            for ev in detected_events:
                e_type = ev["event"]

                # -------------------------------
                # 3️⃣ COOLDOWN CHECK
                # -------------------------------
                last_time = last_alert_times.get(e_type, 0)
                if (current_time - last_time) < COOLDOWN_SECONDS:
                    print(f"⏳ Skipping {e_type} (cooldown active)")
                    continue

                last_alert_times[e_type] = current_time

                # -------------------------------
                # 4️⃣ SAVE FRAME
                # -------------------------------
                filename = save_frame(frame, e_type)
                web_path = f"/events/{e_type}/{filename}"

                # -------------------------------
                # 5️⃣ SAVE TO DATABASE
                # -------------------------------
                track_ids = ev.get("tracks", [])
                add_event_to_db(e_type, web_path, track_ids)

                # -------------------------------
                # 6️⃣ SEND SMS (ONLY FOR VIOLENCE)
                # -------------------------------
                if e_type.upper() == "VIOLENCE":
                    send_sms_alert(e_type)

                # -------------------------------
                # 7️⃣ WEBSOCKET ALERT
                # -------------------------------
                alert_data = {
                    "type": "NEW_ALERT",
                    "event_type": e_type,
                    "path": web_path,
                    "timestamp": datetime.datetime.now().strftime("%H:%M:%S")
                }

                await manager.broadcast(alert_data)
                events.append(alert_data)

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
