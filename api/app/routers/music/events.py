from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload
from typing import List
from sqlalchemy.exc import SQLAlchemyError

from app.schemas.music import (
    ArtistAtEventRead,
    EventWithArtistsRead,
    ArtistWithEventsRead,
    ArtistRead,
    EventRead,
    EventForArtistRead,
    EventWithArtistsCreate,
    EventWithArtistsUpdate,
)

from app.models.music import Artist, ArtistsEvents, Event
from app.database import get_db

router = APIRouter(prefix="/music/events", tags=["events"])


@router.get(
    "/",
    response_model=List[EventWithArtistsRead],
    description="Get events with artists",
)
async def get_events(db: Session = Depends(get_db)):
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


@router.post(
    "/new",
    response_model=EventWithArtistsRead,
    status_code=status.HTTP_201_CREATED,
    description="Create new event",
)
async def post_event(event: EventWithArtistsCreate, db: Session = Depends(get_db)):
    new_event = Event(
        event_name=event.event_name,
        headliner=event.headliner,
        date=event.date,
        venue=event.venue,
    )
    db.add(new_event)
    db.flush()

    for index, artist_name in enumerate(event.artists):
        artist = db.query(Artist).filter(Artist.artist == artist_name).first()
        if not artist:
            artist = Artist(artist=artist_name)
            db.add(artist)
            db.flush()

        ae = ArtistsEvents(
            artist_id=artist.id, event_id=new_event.id, set_order=index + 1
        )
        db.add(ae)

    db.commit()

    new_event = (
        db.query(Event)
        .options(selectinload(Event.artists_events).selectinload(ArtistsEvents.artist))
        .filter(Event.id == new_event.id)
        .one()
    )

    sorted_ae = sorted(new_event.artists_events, key=lambda x: x.set_order)

    # TODO: Add object destructuring here?
    return EventWithArtistsRead(
        id=new_event.id,
        event_name=new_event.event_name,
        headliner=new_event.headliner,
        date=new_event.date,
        venue=new_event.venue,
        artists=[
            ArtistAtEventRead(
                id=ae.artist.id, artist=ae.artist.artist, set_order=ae.set_order
            )
            for ae in sorted_ae
        ],
    )


@router.put(
    "/update/{id}",
    response_model=EventWithArtistsRead,
    description="Update an event entry",
)
async def update_event_entry(
    id: int, event: EventWithArtistsUpdate, db: Session = Depends(get_db)
):
    try:
        update_event = db.scalar(select(Event).where(Event.id == id))
        if not update_event:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Event not found with id {id}",
            )

        for key, value in event.model_dump().items():
            setattr(update_event, key, value)

        db.commit()
        db.refresh(update_event, ["artists_events"])
        return update_event
    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not update event {event.event_name}",
        )


# @router.get(
#     "/all-events-per-artist",
#     response_model=List[ArtistWithEventsRead],
#     description="Get artists with their events and set order",
#     summary="Get Events per Artist",
# )
# async def get_events_per_artist(db: Session = Depends(get_db)):
#     stmt = select(Artist).options(
#         selectinload(Artist.artists_events).selectinload(ArtistsEvents.event)
#     )
#     artists = db.scalars(stmt).all()

#     result: List[ArtistWithEventsRead] = []
#     for artist in artists:

#         # for each artist, get their events with set order per event
#         events = [
#             EventForArtistRead.model_validate(
#                 {**ae.event.__dict__, "set_order": ae.set_order}
#             )
#             for ae in artist.artists_events
#             if ae.event is not None
#         ]
#         a = ArtistWithEventsRead.model_validate({**artist.__dict__, "events": events})
#         result.append(a)

#     return result


# @router.get(
#     "/artists",
#     response_model=List[ArtistRead],
#     description="Get all artists",
#     summary="Get Artists",
# )
# async def get_artists_with_events(db: Session = Depends(get_db)):
#     artists_events = db.scalars(select(Artist)).all()
#     return artists_events


# @router.get(
#     "/events",
#     response_model=List[EventRead],
#     description="Get all events",
#     summary="Get Events",
# )
# async def get_events_with_artists(db: Session = Depends(get_db)):
#     events = db.scalars(select(Event)).all()
#     return events
