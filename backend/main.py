from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import uvicorn

app = FastAPI(title="WhisprWall API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Confession(BaseModel):
    id: Optional[str] = None
    content: str
    category: str
    emotions: List[str] = []
    created_at: datetime = datetime.now()
    avatar_seed: str
    auto_delete_at: Optional[datetime] = None
    
class Reaction(BaseModel):
    type: str  # upvote, hug, relatable
    confession_id: str
    
class Comment(BaseModel):
    confession_id: str
    content: str
    avatar_seed: str
    created_at: datetime = datetime.now()

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to WhisprWall API"}

@app.post("/confessions/")
async def create_confession(confession: Confession):
    # TODO: Implement confession creation
    return {"message": "Confession created"}

@app.get("/confessions/")
async def get_confessions(category: Optional[str] = None, skip: int = 0, limit: int = 10):
    # TODO: Implement confession retrieval
    return {"confessions": []}

@app.post("/confessions/{confession_id}/reactions")
async def add_reaction(confession_id: str, reaction: Reaction):
    # TODO: Implement reaction addition
    return {"message": "Reaction added"}

@app.post("/confessions/{confession_id}/comments")
async def add_comment(confession_id: str, comment: Comment):
    # TODO: Implement comment addition
    return {"message": "Comment added"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
