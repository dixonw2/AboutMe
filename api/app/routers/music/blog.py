from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List
import datetime

from app.schemas.music import (
    BlogAlbumRead,
    BlogSongRead,
    BlogAlbumCreate,
    BlogSongCreate,
    BlogAlbumWithSongsRead,
    BlogAlbumWithSongsCreate,
    BlogAlbumWithSongsUpdate,
)
from app.models.music import BlogAlbum, BlogAlbumSong
from app.database import get_db
from app.schemas.about_me_model import AboutMeModel

router = APIRouter(prefix="/music/blog", tags=["music blog"])


@router.post(
    "/albums/new",
    response_model=BlogAlbumWithSongsRead,
    status_code=status.HTTP_201_CREATED,
    description="Review a new album",
)
async def create_album(
    album: BlogAlbumWithSongsCreate,
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
                song_name=s.song_name,
                song_length=s.song_length,
                id_blog_albums=new_album.id,
            )
            for s in album.songs
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


@router.get(
    "/albums",
    response_model=List[BlogAlbumWithSongsRead],
    description="Get every album that has been reviewed",
)
async def get_albums(db: Session = Depends(get_db)):
    return db.scalars(select(BlogAlbum)).all()


# @router.put(
#     "/albums/update/{id}",
#     response_model=BlogAlbumWithSongsRead,
#     description="Update a blog album entry",
# )
# async def update_blog_album_entry(
#     id: int, album: BlogAlbumWithSongsUpdate, db: Session = Depends(get_db)
# ):
#     try:
#         update_album = db.scalar(select(BlogAlbum).where(BlogAlbum.id == id))
#         if not update_album:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail=f"Blog entry not found with id {id}",
#             )

#         for key, value in album.model_dump().items():
#             setattr(update_album, key, value)

#         db.commit()
#         db.refresh(update_album, ["songs"])
#         return update_album

#     except SQLAlchemyError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail=f"Could not update album {album.album_name}",
#         )


@router.put(
    "/albums/update/{id}",
    response_model=BlogAlbumWithSongsRead,
    description="Update a blog album entry",
)
async def update_blog_album_entry(
    id: int, album: BlogAlbumWithSongsUpdate, db: Session = Depends(get_db)
):
    album_db = db.scalar(select(BlogAlbum).where(BlogAlbum.id == id))
    if not album_db:
        raise HTTPException(
            status_code=404,
            detail=f"Blog entry not found with id {id}",
        )

    # --- Update album fields ---
    data = album.model_dump(exclude={"songs"})
    for key, value in data.items():
        setattr(album_db, key, value)

    # --- Replace ALL songs ---
    album_db.songs.clear()

    for song in album.songs:
        new_song = BlogAlbumSong(
            song_name=song.song_name,
            song_length=song.song_length,
            id_blog_albums=album_db.id,
        )
        album_db.songs.append(new_song)

    db.commit()
    db.refresh(album_db)
    return album_db


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
