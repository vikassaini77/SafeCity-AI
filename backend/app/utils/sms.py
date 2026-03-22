from twilio.rest import Client

# --- CONFIGURE THESE WITH YOUR TWILIO KEYS ---
# (Leave empty if you don't have them yet, it will just print to console)
TWILIO_SID = "YOUR_TWILIO_SID" 
TWILIO_TOKEN = "YOUR_TWILIO_AUTH_TOKEN"
FROM_PHONE = "+1234567890"  # Your Twilio Number
TO_PHONE = "+919876543210"  # Your Personal Number

def send_sms_alert(event_type, camera_id="Cam-01"):
    message_body = f"🚨 URGENT: {event_type} detected at {camera_id}! Check Dashboard immediately."
    
    # Check if keys are set
    if TWILIO_SID == "YOUR_TWILIO_SID":
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