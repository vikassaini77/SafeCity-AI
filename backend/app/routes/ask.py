# backend/app/routes/ask.py

from fastapi import APIRouter
from app.models.schema import QueryRequest
from app.services.rag_pipeline import generate_response

router = APIRouter()


@router.post("/ask")
def ask(data: QueryRequest):
    print("🔥 /ask endpoint called")

    try:
        response = generate_response(data.query)
        print("✅ Response generated")

        return {"response": response}

    except Exception as e:
        print("❌ ERROR IN /ask:", e)
        return {"error": str(e)}