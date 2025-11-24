from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List
import datetime

from app.schemas.music import AlbumCreate, AlbumRead, AlbumUpdate
from app.models.music import BlogAlbum, BlogAlbumSong
from app.database import get_db
from app.schemas.about_me_model import AboutMeModel

router = APIRouter(prefix="/music/blog", tags=["music blog"])


@router.post(
    "/albums/new",
    response_model=AlbumRead,
    status_code=status.HTTP_201_CREATED,
    description="Review a new album",
)
async def create_album(
    album: AlbumCreate,
    db: Session = Depends(get_db),
):

    if not any(album.songs):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Songs cannot be empty"
        )

    try:
        new_album = BlogAlbum(**album.model_dump(exclude={"songs"}))
        db.add(new_album)
        db.flush()

        new_songs = [
            BlogAlbumSong(
                song_name=song.song_name,
                song_length=song.song_length,
                id_blog_albums=new_album.id,
            )
            for song in album.songs
        ]
        db.add_all(new_songs)
        db.commit()

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not insert album {album.album_name}",
        )

    db.refresh(new_album, ["songs"])
    return new_album


@router.get(
    "/",
    response_model=List[AlbumRead],
    description="Get all albums reviewed in blog",
)
async def get_all_albums(db: Session = Depends(get_db)):
    return db.scalars(select(BlogAlbum)).all()


@router.patch(
    "/albums/update/{id}", response_model=AlbumRead, description="Update blog entry"
)
async def update_album_entry(
    id: int, album: AlbumUpdate, db: Session = Depends(get_db)
):
    update_album = db.scalar(select(BlogAlbum).where(BlogAlbum.id == id))
    if not update_album:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog entry not found with id {id}",
        )

    for key, value in album.model_dump(exclude={"songs"}, exclude_unset=True).items():
        setattr(update_album, key, value)

    if album.songs is not None:
        db.query(BlogAlbumSong).filter(BlogAlbumSong.id_blog_albums == id).delete()
        for song in album.songs:
            db.add(BlogAlbumSong(id_blog_albums=id, **song.model_dump()))

    db.commit()
    db.refresh(update_album)
    return update_album


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

    db.delete(album)
    db.commit()