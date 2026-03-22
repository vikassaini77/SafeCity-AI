🛡️ SafeCity AI
🚀 Unified Autonomous Surveillance & Intelligence System












🚀 Transforming CCTV into an AI-powered autonomous decision-making system
🧠 Overview

SafeCity AI is a next-generation AI-powered surveillance platform that transforms traditional CCTV systems from passive monitoring → active intelligent systems.

It combines:

🎥 Real-time computer vision (YOLOv8)
🧠 Semantic understanding via embeddings
🔍 Vector search using Endee
🤖 Retrieval-Augmented Generation (RAG)
⚡ Real-time alerts via WebSockets
💻 Interactive command center dashboard
🚨 Problem Statement

Traditional surveillance systems rely heavily on human monitoring, leading to:

Delayed response to critical incidents
Human error and missed detections
No contextual understanding
No use of historical incident intelligence

👉 There is no system that understands, learns, and recommends actions in real time.

💡 Solution

SafeCity AI introduces:

Real-time detection
Semantic incident understanding
Historical similarity search
AI-powered decision recommendations
🔥 What Makes This Unique?
Combines Computer Vision + RAG (rare in projects)
Uses Endee vector database for semantic intelligence
Converts detection → decision-making system
Full-stack real-time pipeline (CV + Backend + Frontend)
🧩 System Architecture
CCTV / Video Input
        ↓
YOLOv8 Detection
        ↓
Incident Builder
        ↓
Embedding Model
        ↓
Endee Vector Database
        ↓
Retriever (Top-K)
        ↓
RAG (LLM Reasoning)
        ↓
FastAPI + WebSockets
        ↓
React Dashboard
🗄️ How Endee is Used (Core Requirement)

Endee is used as the central vector database powering semantic search.

Workflow:
Incident → converted to text
Text → embedding (Sentence Transformers)
Stored in Endee with metadata
Queried using similarity search
Top-K results passed to RAG
Example Data Schema:
{
  "id": "incident_001",
  "text": "person attacking another person",
  "embedding": [...],
  "metadata": {
    "location": "camera_1",
    "timestamp": "2026-03-22",
    "type": "violence"
  }
}
🔗 Endee Repository Usage (Mandatory)
⭐ Starred: https://github.com/endee-io/endee
🍴 Forked: https://github.com/vikassaini77/endee
Integrated into backend via:
backend/app/services/endee_client.py
🚀 Features
🎥 Real-Time Detection
YOLOv8-based violence detection
Live video processing
Smart alert triggering
🧠 AI Intelligence
Incident description generation
Embedding storage
Semantic understanding
🔍 Semantic Search
{
  "query": "person fighting at night"
}

Returns similar incidents + insights

🤖 RAG Decision System
{
  "risk": "High",
  "reason": "Matches past violent patterns",
  "action": "Dispatch patrol"
}
💻 Dashboard
Real-time alerts
Interactive maps
Threat analytics
📸 Demo
Dashboard

Forensic Analysis

📂 Project Structure
SafeCity-AI/
├── backend/
├── frontend/
├── endee/
├── events/
├── README.md
├── dashboard.png
├── forensic.png
📡 API Example
POST /search
{
  "query": "person fighting at night"
}
Response
{
  "risk": "High",
  "action": "Dispatch patrol"
}
⚙️ Setup Instructions
1️⃣ Clone Repo
git clone https://github.com/vikassaini77/SafeCity-AI
cd SafeCity-AI
2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
4️⃣ Run Endee
git clone https://github.com/vikassaini77/endee
cd endee
docker-compose up
🧪 Demo Mode

System supports simulated input if camera is unavailable.

⚡ Performance
Real-time inference supported
Low-latency alert system
Fast vector retrieval via Endee
🌍 Real-World Applications
Smart City Surveillance
Public Safety Monitoring
Traffic & Crowd Analysis
Campus Security Systems
🧠 Skills Demonstrated
Computer Vision (YOLOv8)
Vector Databases (Endee)
Retrieval-Augmented Generation (RAG)
FastAPI Backend
Real-time systems (WebSockets)
Full-stack development
👨‍💻 Author

Vikas Saini
Machine Learning Engineer | AI Systems | Computer Vision

📄 License

MIT License

🚀 Final Note

SafeCity AI is not just a project —
it is a step toward autonomous AI-driven surveillance systems for smart cities.