import os
import shutil
from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from app.routes import ingest, search, ask
# Custom Imports
from app.routes.stream import router as stream_router
from app.routes.events import router as events_router
from app.routes.stream import process_video  # Import logic for upload analysis
from app.utils.database import init_db
from app.utils.socket_manager import manager

# 1. Initialize App
app = FastAPI(title="SafeCity AI")

# 2. CORS Middleware (Allow Frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Initialize Database on Startup
init_db()

# 4. Mount Static Files (For viewing images)
# Ensure the folder exists to avoid errors
os.makedirs("events", exist_ok=True)
app.mount("/events", StaticFiles(directory="events"), name="events")

# 5. Include Routers
app.include_router(stream_router, prefix="/stream")
app.include_router(events_router, prefix="/api")

# --- ENDPOINTS ---

@app.get("/")
def health():
    return {"status": "SafeCity AI running"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket Error: {e}")

@app.post("/analyze-upload")
async def analyze_uploaded_video(file: UploadFile = File(...)):
    """
    Endpoint for the Frontend 'Forensic Analysis' feature.
    Saves the file temporarily and runs the AI engine on it.
    """
    try:
        # 1. Save the uploaded file locally
        temp_filename = f"temp_{file.filename}"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        print(f"📂 Analyzing uploaded file: {temp_filename}")

        # 2. Run the existing AI logic
        # We await it because process_video is async
        result = await process_video(path=temp_filename)
        
        # 3. Clean up (Optional: delete temp file after analysis)
        # os.remove(temp_filename) 
        
        return {"filename": file.filename, "results": result}
    except Exception as e:
        return {"error": str(e)}
    # backend/app/main.py



app = FastAPI(title="SafeCity AI - Endee Powered")

app.include_router(ingest.router)
app.include_router(search.router)
app.include_router(ask.router)


@app.get("/")
def root():
    return {"message": "SafeCity AI running 🚀"}