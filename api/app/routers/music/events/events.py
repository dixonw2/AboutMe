from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload
from typing import List

from schemas.music import ArtistAtEventRead
from schemas.music import EventWithArtistsRead
from schemas.music import ArtistWithEventsRead
from schemas.music import ArtistRead
from schemas.music import EventRead
from schemas.music import EventForArtistRead

from models.music import Artist
from models.music import ArtistsEvents
from models.music import Event
from database import get_db

router = APIRouter(prefix="/music/events", tags=["events"])


@router.get(
    "/all-artists-per-event",
    response_model=List[EventWithArtistsRead],
    description="Get events with artists in set order",
    summary="Get Artists per Event",
)
async def get_artists_per_event(db: Session = Depends(get_db)):
    stmt = select(Event).options(
        selectinload(Event.artists_events).selectinload(ArtistsEvents.artist)
    )
    events = db.scalars(stmt).all()

    result: List[EventWithArtistsRead] = []
    for event in events:
        
        # for each event, get its artists with set order
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
    "/all-events-per-artist",
    response_model=List[ArtistWithEventsRead],
    description="Get artists with their events and set order",
    summary="Get Events per Artist",
)
async def get_events_per_artist(db: Session = Depends(get_db)):
    stmt = select(Artist).options(
        selectinload(Artist.artists_events).selectinload(ArtistsEvents.event)
    )
    artists = db.scalars(stmt).all()

    result: List[ArtistWithEventsRead] = []
    for artist in artists:
        
        # for each artist, get their events with set order per event
        events = [
            EventForArtistRead.model_validate(
                {**ae.event.__dict__, "set_order": ae.set_order}
            )
            for ae in artist.artists_events
            if ae.event is not None
        ]
        a = ArtistWithEventsRead.model_validate({**artist.__dict__, "events": events})
        result.append(a)

    return result


@router.get(
    "/artists",
    response_model=List[ArtistRead],
    description="Get all artists",
    summary="Get Artists",
)
async def get_artists_with_events(db: Session = Depends(get_db)):
    artists_events = db.scalars(select(Artist)).all()
    return artists_events


@router.get(
    "/events",
    response_model=List[EventRead],
    description="Get all events",
    summary="Get Events",
)
async def get_events_with_artists(db: Session = Depends(get_db)):
    events = db.scalars(select(Event)).all()
    return events
