from models.about_me_model import AboutMeModel


class TripleTriadCardSchema(AboutMeModel):
    card_name: str = None
    left: int = None
    up: int = None
    right: int = None
    down: int = None
    element: str | None = None
    level: int = None
