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
        return filename  # <--- THIS WAS MISSING!
    else:
        print(f"❌ Failed to save frame")
        return None