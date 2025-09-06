from database import Base
from sqlalchemy import Column, String, Integer

class TripleTriadsCards(Base):
    __tablename__ = "TripleTriadCards"
    
    card_name = Column("CardName", String(128), index=True, nullable=False, primary_key=True)
    left = Column("Left", Integer, index=True, nullable=False)
    up = Column("Up", Integer, index=True, nullable=False)
    right = Column("Right", Integer, index=True, nullable=False)
    down = Column("Down", Integer, index=True, nullable=False)
    element = Column("Element", String(32), index=True, nullable=True)
    level = Column("Level", Integer, index=True, nullable=False)