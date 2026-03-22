from fastapi import APIRouter
import glob
import os

router = APIRouter()

@router.get("/list")
def get_events():
    # 1. Look for files in the sibling directory
    from fastapi import APIRouter
from app.utils.database import get_all_events

router = APIRouter()

@router.get("/list")
def get_events():
    # Fetch from SQLite database
    events = get_all_events()
    return {"events": events}