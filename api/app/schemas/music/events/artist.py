from models.about_me_model import AboutMeModel
from typing import List
from .artists_events import ArtistsEventsRead


class ArtistBase(AboutMeModel):
    artist: str


class ArtistCreate(ArtistBase):
    pass


class ArtistRead(ArtistBase):
    id: int
    events: List[ArtistsEventsRead] = []