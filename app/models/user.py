from pydantic import BaseModel
from typing import List, Optional

class UserPreference(BaseModel):
    interests: List[str]
    tech_stack: List[str]
    goal: Optional[str]
    experience_level: str
