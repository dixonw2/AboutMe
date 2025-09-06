from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from schemas.song import SongSchema
from models.songs import Songs
from database import get_db


router = APIRouter(prefix="/songs", tags=["songs"])


@router.get("/", response_model=List[SongSchema], description="Get songs")
async def get_songs(
    db: Session = Depends(get_db),
    year: int = Query(
        None,
        ge=2017,
        le=2030,
        description="Get songs from a specific year",
        example=2021,
    ),
):

    def strip_articles(artist: str) -> str:
        articles = ["the ", "a ", "an "]
        for article in articles:
            if artist.lower().startswith(article):
                return artist[len(article) :]
        return artist

    query = select(Songs)
    if year is not None:
        query = query.where(Songs.year == year)
    songs = db.scalars(query).all()
    songs = sorted(songs, key=lambda song: strip_articles(song.artist))

    return songs
