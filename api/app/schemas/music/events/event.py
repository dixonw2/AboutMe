from models.about_me_model import AboutMeModel
import datetime
from typing import List


class Event(AboutMeModel):
    event_name: str | None = None
    headliner: str | None = None
    date: datetime.date
    venue: str


class EventCreate(Event):
    pass


class EventRead(Event):
    id: int
