from app.schemas import AboutMeModel
import datetime


class SongBase(AboutMeModel):
    song_name: str
    song_rating: int
    song_length: datetime.time


class SongCreate(SongBase):
    pass


class SongRead(SongBase):
    id: int


class SongUpdate(SongBase):
    pass
