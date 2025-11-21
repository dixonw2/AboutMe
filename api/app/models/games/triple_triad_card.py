from app.database import Base
from sqlalchemy import Column, String, Integer


class TripleTriadCard(Base):
    __tablename__ = "TripleTriadCards"
    __table_args__ = {"schema": "Games"}

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    card_name = Column("CardName", String(128), nullable=False, unique=True)
    left = Column("Left", Integer, nullable=False)
    up = Column("Up", Integer, nullable=False)
    right = Column("Right", Integer, nullable=False)
    down = Column("Down", Integer, nullable=False)
    element = Column("Element", String(32), nullable=True)
    level = Column("Level", Integer, index=True, nullable=False)
