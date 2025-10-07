from schemas import AboutMeModel
import datetime
from typing import List


class Event(AboutMeModel):
    event_name: str | None = None
    headliner: str | None = None
    date: datetime.date
    venue: str


class EventRead(Event):
    id: int
