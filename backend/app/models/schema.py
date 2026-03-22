# backend/app/models/schema.py

from pydantic import BaseModel


class IncidentRequest(BaseModel):
    audio_score: float
    posture: str
    emotion: str
    location: str


class QueryRequest(BaseModel):
    query: str