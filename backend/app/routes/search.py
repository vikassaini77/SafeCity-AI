# backend/app/routes/search.py

from fastapi import APIRouter
from app.models.schema import QueryRequest
from app.services.retriever import retrieve_similar_incidents

router = APIRouter()


@router.post("/search")
def search(data: QueryRequest):
    results = retrieve_similar_incidents(data.query)

    return {
        "results": results
    }