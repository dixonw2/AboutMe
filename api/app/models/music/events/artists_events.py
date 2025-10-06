from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class ArtistsEvents(Base):
    __tablename__ = "ArtistsEvents"
    __table_args__ = {"schema": "Music"}

    artist_id = Column(
        "IdArtist", Integer, ForeignKey("Music.Artists.id"), primary_key=True
    )
    event_id = Column(
        "IdEvent", Integer, ForeignKey("Music.Events.id"), primary_key=True
    )
    set_order = Column("SetOrder", Integer, nullable=False)

    artist = relationship("Artist", back_populates="events")
    event = relationship("Event", back_populates="artists")
