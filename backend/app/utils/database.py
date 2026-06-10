import os
import datetime
from typing import List, Dict
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# Support Postgres via DATABASE_URL, fallback to SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./safecity.db")

# SQLite needs specific connect_args
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default='operator', nullable=False)
    department = Column(String, default='')
    organization = Column(String, default='')
    phone = Column(String, default='')
    location = Column(String, default='')
    employee_id = Column(String, default='')
    profile_picture = Column(String, default='')
    reset_token = Column(String, nullable=True)
    reset_token_expiry = Column(String, nullable=True) # ISO string format for simplicity

class EventDB(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    timestamp = Column(String, nullable=False)
    path = Column(String, nullable=False)
    track_ids = Column(String)

def init_db():
    """Creates the tables if they don't exist."""
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def add_event_to_db(event_type: str, path: str, track_ids: List[str]):
    """Saves a new event."""
    db = SessionLocal()
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    tracks_str = ",".join(map(str, track_ids))
    
    event = EventDB(type=event_type, timestamp=now, path=path, track_ids=tracks_str)
    db.add(event)
    db.commit()
    db.close()

def get_all_events() -> List[Dict]:
    """Fetches history for the Dashboard."""
    db = SessionLocal()
    # Get newest first
    events = db.query(EventDB).order_by(EventDB.id.desc()).all()
    db.close()
    
    results = []
    for row in events:
        results.append({
            "id": row.id,
            "type": row.type,
            "timestamp": row.timestamp,
            "path": row.path.replace("\\", "/"),
            "file": row.path.split("/")[-1],
            "tracks": row.track_ids.split(",") if row.track_ids else []
        })
    return results