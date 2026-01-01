from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import (
    preferences, 
    ideas, 
    techstack, 
    architecture, 
    guidance, 
    resources, 
    team_match,
    image_prompt,
    external_links,
    history
)

app = FastAPI(title="Project Idea Platform", version="1.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(preferences.router, prefix="/api/v1")
app.include_router(ideas.router, prefix="/api/v1")
app.include_router(techstack.router, prefix="/api/v1")
app.include_router(architecture.router, prefix="/api/v1")
app.include_router(guidance.router, prefix="/api/v1")
app.include_router(resources.router, prefix="/api/v1")
app.include_router(team_match.router, prefix="/api/v1")
app.include_router(image_prompt.router, prefix="/api/v1")
app.include_router(external_links.router, prefix="/api/v1")
app.include_router(history.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "🚀 Project Idea Platform Backend Running"}
