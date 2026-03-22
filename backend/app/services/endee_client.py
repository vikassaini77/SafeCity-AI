# backend/app/services/endee_client.py

import uuid


class EndeeClient:
    def __init__(self):
        """
        Initialize connection to Endee
        Replace this with actual Endee client setup
        """
        self.storage = []  # TEMP (replace with real Endee)

    def insert(self, vector, metadata, text):
        """
        Store vector + metadata
        """
        record = {
            "id": str(uuid.uuid4()),
            "vector": vector,
            "metadata": metadata,
            "text": text
        }
        self.storage.append(record)
        return record["id"]

    def search(self, query_vector, top_k=5):
        """
        Simple cosine similarity (TEMP)
        Replace with Endee search API
        """

        def cosine_similarity(a, b):
            dot = sum(x*y for x, y in zip(a, b))
            norm_a = sum(x*x for x in a) ** 0.5
            norm_b = sum(x*x for x in b) ** 0.5
            return dot / (norm_a * norm_b + 1e-10)

        scored = []
        for item in self.storage:
            score = cosine_similarity(query_vector, item["vector"])
            scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)

        return [item for _, item in scored[:top_k]]


# Singleton
endee_client = EndeeClient()