from models.about_me_model import AboutMeModel


class ArtistsEventsBase(AboutMeModel):
    artist_id: int
    event_id: int
    set_order: int


class ArtistsEventsCreate(ArtistsEventsBase):
    pass


class ArtistsEventsRead(ArtistsEventsBase):
    pass
