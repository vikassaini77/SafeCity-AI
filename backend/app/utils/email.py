import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

def send_reset_email(to_email: str, reset_token: str):
    reset_link = f"{FRONTEND_URL}/reset-password?token={reset_token}"
    
    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #ffffff; padding: 20px;">
        <div style="max-w-md mx-auto bg-[#1e293b] p-6 rounded-lg border border-[#334155] text-center">
          <h2 style="color: #00f2ff;">SafeCity AI - Password Reset</h2>
          <p style="color: #cbd5e1;">We received a request to reset your password. Click the secure link below to choose a new one:</p>
          <div style="margin: 30px 0;">
            <a href="{reset_link}" style="background-color: #00f2ff; color: #000000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
          </div>
          <p style="color: #64748b; font-size: 12px;">This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
        </div>
      </body>
    </html>
    """

    if not SMTP_USERNAME or not SMTP_PASSWORD:
        print(f"\n📩 [MOCK EMAIL DISPATCH]")
        print(f"To: {to_email}")
        print(f"Subject: Password Reset Request")
        print(f"Link: {reset_link}\n")
        return

    try:
        msg = EmailMessage()
        msg['Subject'] = 'SafeCity AI - Password Reset Request'
        msg['From'] = SMTP_USERNAME
        msg['To'] = to_email
        msg.set_content("Please enable HTML to view this message.")
        msg.add_alternative(html_content, subtype='html')

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            
        print(f"✅ Reset email successfully sent to {to_email}")
    except Exception as e:
        print(f"❌ Failed to send reset email: {e}")
