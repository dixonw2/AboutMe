from typing import List
from schemas import AboutMeModel
from .song import SongRead
import datetime


class AlbumBase(AboutMeModel):
    album: str
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


class AlbumRead(AlbumBase):
    id: int
    date_created: datetime.datetime
    songs: List[SongRead]
