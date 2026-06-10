from fastapi import APIRouter, HTTPException
import os
import TLSSigAPIv2

router = APIRouter()

@router.get("/usersig")
def get_user_sig(userId: str):
    app_id = os.getenv("TRTC_APP_ID")
    secret_key = os.getenv("TRTC_SECRET_KEY")
    
    if not app_id or not secret_key:
        raise HTTPException(status_code=500, detail="TRTC credentials not configured in backend")
        
    try:
        api = TLSSigAPIv2.TLSSigAPIv2(int(app_id), secret_key)
        # Signature valid for 1 day (86400 seconds)
        sig = api.gen_sig(userId, 86400)
        return {
            "userId": userId,
            "userSig": sig,
            "appId": int(app_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate UserSig: {str(e)}")
