from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Artist(Base):
    __tablename__ = "Artists"
    __table_args__ = {"schema": "Music"}

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("Name", String(128), nullable=False)

    events = relationship("ArtistsEvents", back_populates="artist")
