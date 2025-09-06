from pydantic import BaseModel
from typing import Optional


class TripleTriadCardSchema(BaseModel):
    card_name: str = None
    left: int = None
    up: int = None
    right: int = None
    down: int = None
    element: Optional[str] = None
    level: int = None

    class Config:
        orm_mode = True
