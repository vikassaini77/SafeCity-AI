import cv2
import os
import datetime

def save_frame(frame, event_type):
    # 1. Create the folder if it doesn't exist
    directory = f"events/{event_type}"
    os.makedirs(directory, exist_ok=True)
    
    # 2. Generate a unique filename
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"{event_type}_{timestamp}.jpg"
    
    # 3. Save the image
    path = os.path.join(directory, filename)
    success = cv2.imwrite(path, frame)
    
    if success:
        print(f"📸 Saved frame: {path}")
        return filename
    else:
        print(f"❌ Failed to save frame")
        return None

def save_video_clip(frames, event_type, fps=30.0):
    if not frames:
        return None
        
    directory = f"events/{event_type}"
    os.makedirs(directory, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"{event_type}_{timestamp}.mp4"
    path = os.path.join(directory, filename)
    
    height, width = frames[0].shape[:2]
    
    # avc1 codec for mp4 (H.264, standard HTML5 video)
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(path, fourcc, fps, (width, height))
    
    for frame in frames:
        out.write(frame)
        
    out.release()
    print(f"🎥 Saved video clip: {path}")
    return filename