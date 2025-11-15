from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from schemas.music import BlogAlbumRead, BlogSongRead
from models.music import BlogAlbum, BlogAlbumSong
from schemas.music import CommentRead, CommentCreate, CommentUpdate
from models.music import Comment

from database import get_db

from schemas.about_me_model import AboutMeModel

router = APIRouter(prefix="/music/blog", tags=["music blog"])


@router.get(
    "/albums",
    response_model=List[BlogAlbumRead],
    description="Get every album that has been reviewed",
)
async def get_albums(db: Session = Depends(get_db)):
    return db.scalars(select(BlogAlbum)).all()
