import os
from openai import OpenAI
from dotenv import load_dotenv

# 🔥 LOAD ENV FILE
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

print("DEBUG API KEY:", api_key)  # 👈 IMPORTANT

client = OpenAI(api_key=api_key)


def generate_llm_response(prompt: str):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a safety AI system."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"LLM Error: {str(e)}"