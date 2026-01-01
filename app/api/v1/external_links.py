from fastapi import APIRouter, HTTPException
from app.database.dynamo import projects_table
from app.core.ai_provider import gemini_generate_generic
import json

router = APIRouter()

@router.get("/external-links/{user_id}")
async def get_external_links(user_id: str):
    try:
        response = projects_table.get_item(Key={'user_id': user_id})
        if 'Item' not in response:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project = response['Item']
        title = project.get('project_title', 'Unknown Project')
        description = project.get('description', '')
        
        prompt = f"""
        For the software project "{title}": {description}
        Suggest 3-5 existing similar real-world projects or competitors for reference.
        
        Output JSON format (array of objects):
        [
            {{"name": "Competitor Name", "url": "https://..."}}
        ]
        """
        
        gemini_response = await gemini_generate_generic(prompt)
        clean_response = gemini_response.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
