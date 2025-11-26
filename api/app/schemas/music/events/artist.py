from app.schemas import AboutMeModel


class ArtistBase(AboutMeModel):
    artist: str


class ArtistRead(ArtistBase):
    id: int


class ArtistCreate(ArtistBase):
    pass
