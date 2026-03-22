import sqlite3
import datetime
from typing import List, Dict

DB_NAME = "safecity.db"

def init_db():
    """Creates the table if it doesn't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            path TEXT NOT NULL,
            track_ids TEXT
        )
    ''')
    conn.commit()
    conn.close()
    print("✅ Database initialized")

def add_event_to_db(event_type: str, path: str, track_ids: List[str]):
    """Saves a new event."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    tracks_str = ",".join(map(str, track_ids)) # Convert list to "1,2,3"
    
    cursor.execute('INSERT INTO events (type, timestamp, path, track_ids) VALUES (?, ?, ?, ?)', 
                   (event_type, now, path, tracks_str))
    
    conn.commit()
    conn.close()

def get_all_events() -> List[Dict]:
    """Fetches history for the Dashboard."""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row # Allows accessing columns by name
    cursor = conn.cursor()
    
    # Get newest first
    cursor.execute('SELECT * FROM events ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for row in rows:
        results.append({
            "id": row["id"],
            "type": row["type"],
            "timestamp": row["timestamp"],
            "path": row["path"].replace("\\", "/"), # Fix Windows paths for Web
            "file": row["path"].split("/")[-1],
            "tracks": row["track_ids"].split(",")
        })
    return results