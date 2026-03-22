# backend/app/routes/ingest.py

from fastapi import APIRouter
from app.models.schema import IncidentRequest

from app.services.incident_builder import build_incident_text, build_metadata
from app.services.embedding_service import embedding_service
from app.services.endee_client import endee_client

router = APIRouter()


@router.post("/ingest")
def ingest_incident(data: IncidentRequest):
    text = build_incident_text(
        data.audio_score,
        data.posture,
        data.emotion,
        data.location
    )

    metadata = build_metadata(
        data.audio_score,
        data.posture,
        data.emotion,
        data.location
    )

    vector = embedding_service.embed_text(text)

    record_id = endee_client.insert(
        vector=vector,
        metadata=metadata,
        text=text
    )

    return {
        "message": "Incident stored successfully",
        "id": record_id
    }