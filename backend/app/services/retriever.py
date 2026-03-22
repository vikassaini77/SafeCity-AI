# backend/app/services/retriever.py

from app.services.embedding_service import embedding_service
from app.services.endee_client import endee_client


def retrieve_similar_incidents(query: str, top_k: int = 5):
    """
    Convert query → embedding → search Endee
    """
    query_vector = embedding_service.embed_text(query)

    results = endee_client.search(
        query_vector=query_vector,
        top_k=top_k
    )

    return results