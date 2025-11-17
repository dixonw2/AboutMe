from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List

from schemas.music import SongCreate
from models.music import FavoritesSong
from schemas.music import (
    CommentRead,
    CommentCreate,
    CommentUpdate,
    CommentWithSongsRead,
)
from models.music import FavoritesComment

from database import get_db

router = APIRouter(prefix="/music/favorite-songs", tags=["favorite songs"])


@router.get(
    "/",
    response_model=List[CommentWithSongsRead],
    description="Get favorites for every year",
)
async def get_favorites(db: Session = Depends(get_db)):
    return db.scalars(select(FavoritesComment)).all()


@router.put(
    "/comments/update/{year}",
    response_model=CommentRead,
    description="Update comment for given year",
)
async def update_comment(
    year: int, comment: CommentUpdate, db: Session = Depends(get_db)
):
    try:
        update_comment = db.scalar(
            select(FavoritesComment).where(FavoritesComment.year == year)
        )
        if not update_comment:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Comment for year {year} not found",
            )

        update_comment.comment = comment.comment
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not update comment for year {year}",
        )

    db.refresh(update_comment)
    return update_comment


@router.post(
    "/new",
    response_model=CommentWithSongsRead,
    status_code=status.HTTP_201_CREATED,
    description="Create a new entry for the given year",
)
async def post_yearly_entry(
    songs: List[SongCreate],
    comment: CommentCreate,
    year: int,
    db: Session = Depends(get_db),
):
    if len(songs) != 13:
        raise HTTPException(
            status_code=400,
            detail=f"Needs exactly 13 songs (currently {len(songs)})",
        )

    try:
        new_comment = FavoritesComment(**comment.model_dump(), year=year)
        db.add(new_comment)
        db.flush()

        new_songs = [
            FavoritesSong(**s.model_dump(), comment=new_comment) for s in songs
        ]
        db.add_all(new_songs)
        db.commit()

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not add new list for year {year}",
        )

    db.refresh(new_comment, ["songs"])
    return new_comment


@router.delete(
    "/delete/{year}",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Delete entry for given year",
)
async def delete_yearly_entry(year: int, db: Session = Depends(get_db)):
    entry = db.get(FavoritesComment, year)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Entry not found for year {year}",
        )

    try:
        db.delete(entry)
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not delete entry for year {year}",
        )
