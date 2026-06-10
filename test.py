import urllib.request
import json
try:
    urllib.request.urlopen('http://127.0.0.1:8000/api/trtc/usersig?userId=cam-3-streamer')
except Exception as e:
    print(e.read().decode())
