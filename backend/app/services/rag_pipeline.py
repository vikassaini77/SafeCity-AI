# backend/app/services/rag_pipeline.py

from app.services.retriever import retrieve_similar_incidents
from app.services.llm_service import generate_llm_response

def generate_response(query: str):
    print("🧠 Inside RAG pipeline")
def build_context(results):
    return "\n\n".join([r["text"] for r in results])


def generate_response(query: str):
    print("📥 Query received:", query)

    # Step 1: Retrieve similar incidents
    results = retrieve_similar_incidents(query)
    print("📊 Retrieved:", results)

    # Step 2: Build context
    context = build_context(results)
    print("🧠 Context:", context)

    # Step 3: Create prompt
    prompt = f"""
You are the SafeCity AI Copilot, a friendly and intelligent city safety assistant.

If the user is just saying hello or asking a general question, respond naturally and conversationally without using a rigid format.

If the user is asking about an anomaly, safety incident, or specific security camera situation, use the following context to analyze it:

PAST INCIDENTS:
{context}

CURRENT QUERY:
{query}

For security analysis queries ONLY, structure your response exactly like this:
1. Risk Level (Low/Medium/High)
2. Explanation
3. Recommended Action
4. Any pattern you observe
"""

    print("🚀 Sending to LLM...")

    # Step 4: Generate response
    response = generate_llm_response(prompt)

    print("✅ LLM Response:", response)

    return response