from app.schemas import AboutMeModel
import datetime


class EventBase(AboutMeModel):
    event_name: str | None = None
    headliner: str | None = None
    date: datetime.date
    venue: str


class EventRead(EventBase):
    id: int


class EventCreate(EventBase):
    pass
