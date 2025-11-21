from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from app.database import Base


class Event(Base):
    __tablename__ = "Events"
    __table_args__ = {"schema": "Music"}

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    event_name = Column("EventName", String(64), nullable=True)
    headliner = Column("Headliner", String(64), nullable=True)
    date = Column("Date", Date, nullable=False)
    venue = Column("Venue", String(64), nullable=False)

    artists_events = relationship("ArtistsEvents", back_populates="event")