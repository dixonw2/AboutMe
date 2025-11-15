from schemas import AboutMeModel
import datetime


class CommentBase(AboutMeModel):
    comment: str


class CommentCreate(CommentBase):
    pass


class CommentRead(CommentBase):
    year: int
    date_created: datetime.datetime
    date_updated: datetime.datetime | None = None


class CommentUpdate(CommentBase):
    pass
