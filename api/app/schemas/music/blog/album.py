from typing import List
from app.schemas import AboutMeModel
from .song import SongRead, SongCreate
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
    pass


class AlbumWithSongsUpdate(AlbumBase):
    pass


class AlbumRead(AlbumBase):
    id: int
    date_created: datetime.datetime


class AlbumWithSongsRead(AlbumRead):
    songs: List[SongRead]


class AlbumWithSongsCreate(AlbumCreate):
    songs: List[SongCreate]
