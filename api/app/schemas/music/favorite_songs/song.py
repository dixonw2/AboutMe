from app.schemas import AboutMeModel
import datetime


class SongBase(AboutMeModel):
    song_name: str
    artist: str
    album: str
    genre: str
    song_length: datetime.time
    apple_music_link: str
    spotify_link: str


class SongCreate(SongBase):
    pass


class SongRead(SongBase):
    id: int


class SongUpdate(SongBase):
    song_name: str | None = None
    artist: str | None = None
    album: str | None = None
    genre: str | None = None
    song_length: datetime.time | None = None
    apple_music_link: str | None = None
    spotify_link: str | None = None
