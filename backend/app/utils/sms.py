import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

# --- CONFIGURE THESE WITH YOUR TWILIO KEYS ---
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID", "YOUR_TWILIO_SID")
TWILIO_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "YOUR_TWILIO_AUTH_TOKEN")
FROM_PHONE = os.getenv("TWILIO_PHONE_NUMBER", "+1234567890")
TO_PHONE = os.getenv("DESTINATION_PHONE", "+919876543210")

def send_sms_alert(event_type, camera_id="Cam-01"):
    message_body = f"🚨 URGENT: {event_type} detected at {camera_id}! Check Dashboard immediately."
    
    # Check if keys are set
    if TWILIO_SID == "YOUR_TWILIO_SID" or not TWILIO_SID:
        print(f"📲 [MOCK SMS]: {message_body}")
        return

    try:
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        message = client.messages.create(
            body=message_body,
            from_=FROM_PHONE,
            to=TO_PHONE
        )
        print(f"✅ SMS Sent: {message.sid}")
    except Exception as e:
        print(f"❌ SMS Failed: {e}")