from schemas import AboutMeModel
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
    year: int
