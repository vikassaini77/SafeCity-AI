import requests
import os

# PASTE YOUR PATH INSIDE THE QUOTES BELOW
# Example: "C:\Users\hp\Downloads\SafeCity-AI-FULL\backend\test.mp4"
video_path = r"C:\Users\hp\Downloads\SafeCity-AI-FULL\sample_videos\test.mp4"

# Clean up quotes if they got copied
video_path = video_path.strip('"')

print(f"📂 Checking if file exists at: {video_path}")

if os.path.exists(video_path):
    print("✅ File found! Sending to server...")
    try:
        # Send the request
        url = f"http://127.0.0.1:8000/stream/video?path={video_path}"
        response = requests.post(url)
        print("✅ Server Response:", response.json())
    except Exception as e:
        print("❌ Connection Error. Is the backend running?", e)
else:
    print("❌ ERROR: Python cannot find the file on your disk.")
    print("   -> Please check the path again.")