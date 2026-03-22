# backend/app/services/incident_builder.py

from datetime import datetime


def build_incident_text(audio_score, posture, emotion, location="unknown"):
    """
    Convert raw signals into meaningful incident description
    """

    time_of_day = get_time_of_day()

    severity = "low"
    if audio_score > 0.8:
        severity = "high"
    elif audio_score > 0.5:
        severity = "medium"

    description = f"""
    Incident detected with {severity} distress level.
    Audio distress score: {audio_score}.
    Detected emotion: {emotion}.
    Body posture: {posture}.
    Time: {time_of_day}.
    Location: {location}.
    """

    return description.strip()


def build_metadata(audio_score, posture, emotion, location="unknown"):
    return {
        "audio_score": audio_score,
        "posture": posture,
        "emotion": emotion,
        "location": location,
        "timestamp": datetime.utcnow().isoformat()
    }


def get_time_of_day():
    hour = datetime.now().hour
    if 5 <= hour < 12:
        return "morning"
    elif 12 <= hour < 17:
        return "afternoon"
    elif 17 <= hour < 21:
        return "evening"
    else:
        return "night"