from fastapi import APIRouter, HTTPException
from app.database.dynamo import projects_table, users_table
from app.core.ai_provider import gemini_generate_generic
from uuid import uuid4
import json

router = APIRouter(tags=["Project Ideas"])

@router.get("/project-idea")
async def generate_random_idea():
    try:
        user_id = str(uuid4())
        
        prompt = """
        Generate a unique, modern, and impressive software project idea.
        The idea should be feasible for a developer to build as a portfolio project.
        
        Output JSON format:
        {
            "title": "Project Title",
            "description": "Detailed description of the project."
        }
        """
        
        gemini_response = await gemini_generate_generic(prompt)
        
        try:
            # Clean up response if it has markdown code blocks
            clean_response = gemini_response.replace("```json", "").replace("```", "").strip()
            project = json.loads(clean_response)
        except:
            project = {"title": "Random Project Idea", "description": gemini_response}
            
        item = {
            "user_id": user_id,
            "project_title": project.get("title"),
            "description": project.get("description"),
            "type": "random"
        }
        
        projects_table.put_item(Item=item)
        
        return item
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
