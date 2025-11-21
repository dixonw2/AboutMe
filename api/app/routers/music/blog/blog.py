from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List

from app.schemas.music import (
    BlogAlbumRead,
    BlogSongRead,
    BlogAlbumCreate,
    BlogSongCreate,
    BlogAlbumWithSongsRead,
)
from app.models.music import BlogAlbum, BlogAlbumSong

from app.database import get_db

from app.schemas.about_me_model import AboutMeModel

router = APIRouter(prefix="/music/blog", tags=["music blog"])


class Temp(AboutMeModel):
    album: BlogAlbumRead
    songs: List[BlogSongRead]


@router.get(
    "/albums",
    response_model=List[BlogAlbumWithSongsRead],
    description="Get every album that has been reviewed",
)
async def get_albums(db: Session = Depends(get_db)):
    return db.scalars(select(BlogAlbum)).all()


@router.post(
    "/albums/new",
    response_model=BlogAlbumWithSongsRead,
    status_code=status.HTTP_201_CREATED,
    description="Review a new album",
)
async def create_album(
    album: BlogAlbumCreate,
    songs: List[BlogSongCreate],
    db: Session = Depends(get_db),
):
    try:
        new_album = BlogAlbum(**album.model_dump())
        db.add(new_album)
        db.flush()

        new_songs = [
            BlogAlbumSong(**song.model_dump(), id_blog_albums=new_album.id)
            for song in songs
        ]
        db.add_all(new_songs)
        db.commit()

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not insert album {album.album}",
        )

    db.refresh(new_album, ["songs"])
    return new_album


@router.delete(
    "/albums/delete/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Delete album with specified id",
)
async def delete_album(id: int, db: Session = Depends(get_db)):
    album = db.get(BlogAlbum, id)
    if not album:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Album not found with id {id}",
        )

    try:
        db.delete(album)
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not delete album {album.album} with id {id}",
        )
