from fastapi import APIRouter, HTTPException
from app.models.user import UserPreference
from app.database.dynamo import users_table, projects_table
from app.core.ai_provider import gemini_generate_generic
from uuid import uuid4
import json

router = APIRouter(tags=["User Preferences"])

@router.post("/preferences")
async def generate_idea_from_preferences(pref: UserPreference):
    try:
        user_id = str(uuid4())
        # Save preferences to Users Table
        user_data = pref.dict()
        user_data["user_id"] = user_id
        users_table.put_item(Item=user_data)

        # Gemini Smart Idea based on Preferences
        prompt = f"""
        Generate a unique and modern software project idea based on the following user preferences:
        Interests: {', '.join(pref.interests)}
        Preferred Tech Stack: {', '.join(pref.tech_stack)}
        Goal: {pref.goal}
        Experience Level: {pref.experience_level}

        The idea should be detailed and feasible.
        Output JSON format:
        {{
            "title": "Project Title",
            "description": "Detailed description of the project."
        }}
        """

        try:
            gemini_response = await gemini_generate_generic(prompt)
            clean_response = gemini_response.replace("```json", "").replace("```", "").strip()
            project = json.loads(clean_response)
        except Exception as e:
            print(f"Gemini error: {e}")
            project = {
                "title": "Custom Project Idea", 
                "description": "Could not parse AI response, but your preferences are saved."
            }

        idea_data = {
            "user_id": user_id,
            "project_title": project.get("title"),
            "description": project.get("description"),
            "preferences": user_data
        }
        
        projects_table.put_item(Item=idea_data)
        
        return {
            "user_id": user_id,
            "project_title": project.get("title"),
            "description": project.get("description")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
