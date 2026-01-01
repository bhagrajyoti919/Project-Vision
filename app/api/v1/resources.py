from fastapi import APIRouter, HTTPException
from app.database.dynamo import projects_table
from app.core.ai_provider import gemini_generate_generic
import json

router = APIRouter()

@router.get("/resources/{user_id}")
async def get_resources(user_id: str):
    try:
        response = projects_table.get_item(Key={'user_id': user_id})
        if 'Item' not in response:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project = response['Item']
        title = project.get('project_title', 'Unknown Project')
        description = project.get('description', '')
        
        prompt = f"""
        For the software project "{title}": {description}
        Suggest 5 key learning resources or documentation links relevant to the tech stack and domain.
        
        Output JSON format (array of objects):
        [
            {{"title": "Resource Name", "url": "https://...", "type": "Documentation/Course/Article"}}
        ]
        """
        
        gemini_response = await gemini_generate_generic(prompt)
        clean_response = gemini_response.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
