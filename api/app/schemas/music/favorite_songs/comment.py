from typing import List
from schemas import AboutMeModel
import datetime
from .song import SongRead


class CommentBase(AboutMeModel):
    comment: str


class CommentCreate(CommentBase):
    pass


class CommentRead(CommentBase):
    year: int
    date_created: datetime.datetime
    date_updated: datetime.datetime | None = None


class CommentWithSongsRead(CommentRead):
    songs: List[SongRead]


class CommentUpdate(CommentBase):
    pass
