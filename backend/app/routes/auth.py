from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import os
import uuid
from typing import Optional

from app.utils.auth import verify_password, get_password_hash, create_access_token, decode_access_token
from app.utils.database import get_db, UserDB

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    department: Optional[str] = None
    organization: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    employee_id: Optional[str] = None

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    email = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(UserDB).filter(UserDB.email == email).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = get_password_hash(user.password)
    
    try:
        new_user = UserDB(email=user.email, hashed_password=hashed_pw, name=user.name)
        db.add(new_user)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")
    
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": db_user.email})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "email": db_user.email,
            "name": db_user.name,
            "role": db_user.role,
            "department": db_user.department,
            "organization": db_user.organization,
            "phone": db_user.phone,
            "location": db_user.location,
            "employee_id": db_user.employee_id,
            "profile_picture": db_user.profile_picture
        }
    }

@router.get("/me")
def read_users_me(current_user: UserDB = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "role": current_user.role,
        "department": current_user.department,
        "organization": current_user.organization,
        "phone": current_user.phone,
        "location": current_user.location,
        "employee_id": current_user.employee_id,
        "profile_picture": current_user.profile_picture
    }

@router.put("/profile")
def update_profile(profile_update: UserUpdate, current_user: UserDB = Depends(get_current_user), db: Session = Depends(get_db)):
    
    update_data = profile_update.dict(exclude_unset=True)
    if not update_data:
        return {"message": "No fields to update"}
        
    for key, value in update_data.items():
        setattr(current_user, key, value)
    
    try:
        db.commit()
        db.refresh(current_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update profile")
        
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "role": current_user.role,
        "department": current_user.department,
        "organization": current_user.organization,
        "phone": current_user.phone,
        "location": current_user.location,
        "employee_id": current_user.employee_id,
        "profile_picture": current_user.profile_picture
    }

@router.post("/profile/picture")
async def upload_profile_picture(file: UploadFile = File(...), current_user: UserDB = Depends(get_current_user), db: Session = Depends(get_db)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Generate unique filename
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    filepath = os.path.join("avatars", filename)
    
    try:
        with open(filepath, "wb") as buffer:
            buffer.write(await file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail="Could not save file")
        
    url = f"/avatars/{filename}"
    
    # Update user in DB
    current_user.profile_picture = url
    db.commit()
    
    return {"profile_picture": url}

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    from datetime import datetime, timedelta
    import secrets
    from app.utils.email import send_reset_email
    
    user = db.query(UserDB).filter(UserDB.email == req.email).first()
    if not user:
        # We return success anyway to prevent email enumeration
        return {"message": "If that email exists, a reset link was sent."}
        
    token = secrets.token_hex(32)
    expiry = (datetime.utcnow() + timedelta(hours=1)).isoformat()
    
    user.reset_token = token
    user.reset_token_expiry = expiry
    db.commit()
    
    send_reset_email(user.email, token)
    return {"message": "If that email exists, a reset link was sent."}

@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    from datetime import datetime
    
    user = db.query(UserDB).filter(UserDB.reset_token == req.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token.")
        
    if user.reset_token_expiry:
        expiry_dt = datetime.fromisoformat(user.reset_token_expiry)
        if datetime.utcnow() > expiry_dt:
            raise HTTPException(status_code=400, detail="Reset token has expired.")
            
    # Update password
    hashed_pw = get_password_hash(req.new_password)
    user.hashed_password = hashed_pw
    user.reset_token = None
    user.reset_token_expiry = None
    db.commit()
    
    return {"message": "Password successfully reset."}
