from app.schemas import AboutMeModel
from typing import List

from .artist import ArtistRead, ArtistCreate
from .event import EventRead, EventCreate


class ArtistAtEventRead(ArtistRead):
    set_order: int


class EventForArtistRead(EventRead):
    set_order: int


class EventWithArtistsRead(EventRead):
    artists: List[ArtistAtEventRead]


class EventWithArtistsCreate(EventCreate):
    artists: List[str]


class ArtistsEventsBase(AboutMeModel):
    set_order: int


class ArtistsEventsRead(ArtistsEventsBase):
    artist: ArtistRead | None = None
    event: EventRead | None = None


class ArtistWithEventsRead(ArtistRead):
    events: List[EventForArtistRead] = []


class EventWithArtistsUpdate(EventWithArtistsCreate):
    pass
