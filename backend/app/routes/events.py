from fastapi import APIRouter
from app.utils.database import get_all_events

router = APIRouter()

@router.get("/list")
def get_events():
    # Fetch from database
    events = get_all_events()
    return {"events": events}