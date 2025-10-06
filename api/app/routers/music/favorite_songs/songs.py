from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from schemas.music.favorite_songs.song import SongRead
from models.music.favorite_songs_of_year.song import Song
from database import get_db

router = APIRouter(prefix="/music/favorite-songs/songs", tags=["songs"])


@router.get("/", response_model=List[SongRead], description="Get songs")
async def get_songs(db: Session = Depends(get_db)):
    return db.scalars(select(Song)).all()
