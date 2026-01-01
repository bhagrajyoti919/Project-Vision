from fastapi import APIRouter, HTTPException
from app.database.dynamo import projects_table

router = APIRouter()

@router.get("/history")
async def get_history():
    try:
        # Scan the table to get all items (limit to 20 for performance in this demo)
        response = projects_table.scan(Limit=20)
        items = response.get('Items', [])
        
        # Sort by user_id (not ideal for timestamp, but acceptable if no timestamp field)
        # Ideally we should have a timestamp field. I won't add it now to avoid breaking schema assumptions.
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
