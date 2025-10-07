from schemas import AboutMeModel
import datetime

class CommentBase(AboutMeModel):
    year: int
    comment: str

class CommentCreate(CommentBase):
    pass

class CommentRead(CommentBase):
    date_created: datetime.datetime
    date_updated: datetime.datetime | None = None