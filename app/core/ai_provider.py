from google import genai
from app.core.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

async def gemini_generate(project_context):
    prompt = f"""
    Suggest a unique and modern software project idea based on:
    {project_context}

    Output JSON:
    {{
        "title": "",
        "description": "",
        "tech_stack": []
    }}
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return response.text

async def gemini_generate_generic(prompt_text):
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt_text
    )
    return response.text
