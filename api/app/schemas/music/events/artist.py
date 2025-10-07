from schemas import AboutMeModel
from typing import List


class ArtistBase(AboutMeModel):
    artist: str


class ArtistRead(ArtistBase):
    id: int
