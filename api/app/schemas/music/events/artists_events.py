from app.schemas import AboutMeModel
from typing import List

from .artist import ArtistRead
from .event import EventRead, EventCreate

import datetime


class ArtistAtEventRead(ArtistRead):
    set_order: int


class EventWithArtistsRead(EventRead):
    artists: List[ArtistAtEventRead]


class EventWithArtistsCreate(EventCreate):
    artists: List[str]


class ArtistsEventsBase(AboutMeModel):
    set_order: int
    artist: ArtistRead
    event: EventRead


class ArtistWithEventsRead(ArtistRead):
    events: List[EventRead]


class EventWithArtistsUpdate(AboutMeModel):
    event_name: str | None = None
    headliner: str | None = None
    date: datetime.date | None = None
    venue: str | None = None
    
    artists: List[str] | None = None