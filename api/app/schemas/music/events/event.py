from app.schemas import AboutMeModel
import datetime
from typing import List


class EventBase(AboutMeModel):
    event_name: str | None = None
    headliner: str | None = None
    date: datetime.date
    venue: str


class EventRead(EventBase):
    id: int


class EventCreate(EventBase):
    pass
