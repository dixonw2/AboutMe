from schemas import AboutMeModel
from typing import List

from .artist import ArtistRead
from .event import EventRead


class ArtistAtEventRead(ArtistRead):
    set_order: int


class EventForArtistRead(EventRead):
    set_order: int


class EventWithArtistsRead(EventRead):
    artists: List[ArtistAtEventRead] = []


class ArtistsEventsBase(AboutMeModel):
    set_order: int


class ArtistsEventsRead(ArtistsEventsBase):
    artist: ArtistRead | None = None
    event: EventRead | None = None


class ArtistWithEventsRead(ArtistRead):
    events: List[EventForArtistRead] = []
