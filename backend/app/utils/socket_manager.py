from fastapi import WebSocket
from typing import List

class ConnectionManager:
    def __init__(self):
        # Keep track of who is connected (e.g., your Dashboard)
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print("✅ Dashboard Connected to WebSocket")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print("❌ Dashboard Disconnected")

    async def broadcast(self, message: dict):
        # Send the alert to all connected dashboards
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Error sending message: {e}")

# Create a global instance
manager = ConnectionManager()