from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload, selectinload
from typing import List

from schemas.music import ArtistAtEventRead
from schemas.music import EventWithArtistsRead
from schemas.music import ArtistRead
from schemas.music import EventRead

from models.music import Artist
from models.music import ArtistsEvents
from models.music import Event
from database import get_db

router = APIRouter(prefix="/music/events", tags=["events"])


@router.get(
    "/all-artists-and-events",
    response_model=List[EventWithArtistsRead],
    description="Get events with artists in order",
)
async def get_events(db: Session = Depends(get_db)):
    stmt = select(Event).options(
        selectinload(Event.artists_events).selectinload(ArtistsEvents.artist)
    )
    events = db.scalars(stmt).all()

    result: List[EventWithArtistsRead] = []
    for event in events:
        artists = [
            ArtistAtEventRead.model_validate(
                {**ae.artist.__dict__, "set_order": ae.set_order}  # all artist fields
            )
            for ae in event.artists_events
            if ae.artist is not None
        ]
        e = EventWithArtistsRead.model_validate({**event.__dict__, "artists": artists})
        result.append(e)

    return result


@router.get(
    "/artists", response_model=List[ArtistRead], description="Get artists with events"
)
async def get_artists_with_events(db: Session = Depends(get_db)):
    artists_events = db.scalars(select(Artist)).all()
    return artists_events


@router.get(
    "/events", response_model=List[EventRead], description="Get events"
)
async def get_events_with_artists(db: Session = Depends(get_db)):
    events = db.scalars(select(Event)).all()
    return events
