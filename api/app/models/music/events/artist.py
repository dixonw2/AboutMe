from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Artist(Base):
    __tablename__ = "Artists"
    __table_args__ = {"schema": "Music"}

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    artist = Column("artist", String(128), nullable=False)

    artists_events = relationship("ArtistsEvents", back_populates="artist")