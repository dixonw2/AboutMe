from typing import List
from app.schemas import AboutMeModel
import datetime
from .song import SongRead, SongCreate


class CommentBase(AboutMeModel):
    comment: str


class CommentCreate(CommentBase):
    pass


class CommentRead(CommentBase):
    year: int
    date_created: datetime.datetime
    date_updated: datetime.datetime | None = None


class CommentWithSongsBase(CommentRead):
    songs: List[SongRead]


class CommentWithSongsRead(CommentWithSongsBase):
    pass


class CommentWithSongsCreate(CommentBase):
    year: int
    songs: List[SongCreate]


class CommentUpdate(CommentBase):
    pass
