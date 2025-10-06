from models.about_me_model import AboutMeModel


class TripleTriadCardBase(AboutMeModel):
    card_name: str
    left: int
    up: int
    right: int
    down: int
    element: str | None = None
    level: int

class TripleTriadCardCreate(TripleTriadCardBase):
    pass 

class TripleTriadCardRead(TripleTriadCardBase):
    id: int