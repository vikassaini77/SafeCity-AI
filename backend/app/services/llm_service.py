import os
from groq import Groq
from dotenv import load_dotenv

# 🔥 LOAD ENV FILE
load_dotenv()

# Use provided GROQ API key from .env
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print("⚠️ WARNING: GROQ_API_KEY is not set in .env")

client = Groq(api_key=api_key)

def generate_llm_response(prompt: str):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a safety AI system."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"LLM Error: {str(e)}"