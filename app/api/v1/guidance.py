from fastapi import APIRouter, HTTPException
from app.database.dynamo import projects_table
from app.core.ai_provider import gemini_generate_generic
import json

router = APIRouter()

@router.get("/guidance/{user_id}")
async def get_guidance(user_id: str):
    try:
        response = projects_table.get_item(Key={'user_id': user_id})
        if 'Item' not in response:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project = response['Item']
        title = project.get('project_title', 'Unknown Project')
        description = project.get('description', '')
        
        prompt = f"""
        For the software project "{title}": {description}
        Provide a step-by-step implementation guide.
        
        Output JSON format (array of strings):
        ["Step 1: ...", "Step 2: ...", ...]
        """
        
        gemini_response = await gemini_generate_generic(prompt)
        clean_response = gemini_response.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
