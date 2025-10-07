from models import AboutMeModel
from typing import List

from .artist import ArtistRead
from .event import EventRead


class ArtistBase(AboutMeModel):
    artist: str


class ArtistAtEventRead(ArtistRead):
    set_order: int


class EventWithArtistsRead(EventRead):
    artists: List[ArtistAtEventRead] = []


class ArtistsEventsBase(AboutMeModel):
    set_order: int


class ArtistsEventsCreate(ArtistsEventsBase):
    pass


class ArtistsEventsRead(ArtistsEventsBase):
    artist: ArtistRead | None = None
    event: EventRead | None = None
