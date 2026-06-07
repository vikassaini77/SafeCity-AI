import requests

# The URL of your local running FastAPI server
URL = "http://127.0.0.1:8000/ingest"

# Sample incidents for SafeCity AI
incidents = [
    {
        "incident_id": "INC_001",
        "description": "A woman was heard screaming at 2 AM near the East Gate. Security footage shows aggressive movements and a person running away.",
        "location": "East Gate",
        "timestamp": "2026-03-20T02:00:00"
    },
    {
        "incident_id": "INC_002",
        "description": "Suspicious person spotted loitering near the ATM area for over 30 minutes wearing a dark hoodie.",
        "location": "Main Square ATM",
        "timestamp": "2026-03-20T14:30:00"
    }
]

for data in incidents:
    response = requests.post(URL, json=data)
    print(f"Ingesting {data['incident_id']}: {response.status_code}")