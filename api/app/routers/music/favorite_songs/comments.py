from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from schemas.music import CommentRead
from models.music import Comment
from database import get_db

router = APIRouter(prefix="/music/favorite-songs/comments", tags=["comments"])


@router.get("/", response_model=List[CommentRead], description="Get comments for years")
async def get_comments(db: Session = Depends(get_db)):
    return db.scalars(select(Comment)).all()
