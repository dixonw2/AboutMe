from typing import List
from app.schemas import AboutMeModel
from .song import SongRead, SongCreate, SongUpdate
import datetime


class AlbumBase(AboutMeModel):
    album_name: str
    artist: str
    genre: str
    review: str
    rating: int
    apple_music_link: str
    spotify_link: str
    release_date: datetime.date
    album_art_path: str


class AlbumCreate(AlbumBase):
    songs: List[SongCreate]


class AlbumRead(AlbumBase):
    id: int
    date_created: datetime.datetime

    songs: List[SongRead]


class AlbumUpdate(AlbumBase):
    album_name: str | None = None
    artist: str | None = None
    genre: str | None = None
    review: str | None = None
    rating: int | None = None
    apple_music_link: str | None = None
    spotify_link: str | None = None
    release_date: datetime.date | None = None
    album_art_path: str | None = None

    songs: List[SongUpdate] | None = None
