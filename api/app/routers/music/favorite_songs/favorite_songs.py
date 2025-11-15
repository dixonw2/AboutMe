from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from schemas.music import SongRead, SongCreate
from models.music import Song
from schemas.music import CommentRead, CommentCreate
from models.music import Comment

from database import get_db

from schemas.about_me_model import AboutMeModel

router = APIRouter(prefix="/music/favorite-songs", tags=["favorite songs"])


class YearlyEntryRead(AboutMeModel):
    songs: List[SongRead]
    comment: CommentRead


@router.get("/songs", response_model=List[SongRead], description="Get songs")
async def get_songs(db: Session = Depends(get_db)):
    return db.scalars(select(Song)).all()


@router.get(
    "/comments", response_model=List[CommentRead], description="Get comments for years"
)
async def get_comments(db: Session = Depends(get_db)):
    return db.scalars(select(Comment)).all()


@router.post(
    "/new",
    response_model=YearlyEntryRead,
    status_code=status.HTTP_201_CREATED,
    description="Create a new comment for the year",
)
async def post_yearly_entry(
    songs: List[SongCreate],
    comment: CommentCreate,
    year: int,
    db: Session = Depends(get_db),
):

    exists = db.scalar(select(Comment).where(Comment.year == year))
    if exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Comment already exists for year {year}",
        )

    if len(songs) != 13:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Needs exactly 13 songs (Currently have {len(songs)})",
        )

    new_comment = Comment(**comment.model_dump(exclude_unset=True), year=year)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    new_songs = [Song(**s.model_dump(), year=year) for s in songs]
    db.add_all(new_songs)
    db.commit()

    for s in new_songs:
        db.refresh(s)

    return YearlyEntryRead(songs=new_songs, comment=new_comment)
