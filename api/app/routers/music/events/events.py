from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from schemas.music.events.artists_events import ArtistsEventsRead
from models.music.events.artist import Artist
from models.music.events.artists_events import ArtistsEvents
from models.music.events.event import Event
from database import get_db

router = APIRouter(prefix="/music/events/events", tags=["events"])


@router.get("/", response_model=List[ArtistsEventsRead], description="Get events")
async def get_events(db: Session = Depends(get_db)):
    artist_events = db.query(ArtistsEvents).all()
    return artist_events
