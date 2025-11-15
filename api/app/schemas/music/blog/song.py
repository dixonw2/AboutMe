from schemas import AboutMeModel
import datetime


class SongBase(AboutMeModel):
    song_name: str
    song_length: datetime.time


class SongCreate(SongBase):
    pass


class SongRead(SongBase):
    id: int
    id_blog_albums: int
