import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete
from datetime import time

from app.database import Base
from tests.conftest import TestingSessionLocal, test_engine
from app.models.music import Artist, ArtistsEvents, Event
from fastapi import status
from tests.constants import TEST_CREATE_BLOG_ENTRY, TEST_CREATE_EVENT_ENTRY
from app.schemas.music import EventWithArtistsCreate


@pytest.fixture(autouse=True)
def reset_test_events():
    tables_to_reset = [
        ArtistsEvents.__table__,
        Artist.__table__,
        Event.__table__,
    ]
    with test_engine.begin() as conn:
        for table in tables_to_reset:
            conn.execute(delete(table))

    session = TestingSessionLocal()
    try:
        event = Event(
            event_name=TEST_CREATE_EVENT_ENTRY["eventName"],
            headliner=TEST_CREATE_EVENT_ENTRY["headliner"],
            date=TEST_CREATE_EVENT_ENTRY["date"],
            venue=TEST_CREATE_EVENT_ENTRY["venue"],
        )
        session.add(event)
        session.flush()

        for index, artist_name in enumerate(TEST_CREATE_EVENT_ENTRY["artists"]):
            artist = Artist(artist=artist_name)
            session.add(artist)
            session.flush()

            ae = ArtistsEvents(
                artist_id=artist.id,
                event_id=event.id,
                set_order=index + 1,
            )
            session.add(ae)

        session.commit()

        session.refresh(event)
        yield event

    finally:
        session.close()


# def test_proper_set_order()


def test_create_event(client: TestClient):
    test_event = EventWithArtistsCreate(
        event_name=TEST_CREATE_EVENT_ENTRY["eventName"] + "New",
        headliner=TEST_CREATE_EVENT_ENTRY["headliner"] + "New",
        date=TEST_CREATE_EVENT_ENTRY["date"],
        venue=TEST_CREATE_EVENT_ENTRY["venue"],
        artists=[artist + "New" for artist in TEST_CREATE_EVENT_ENTRY["artists"]],
    )
    response = client.post("api/music/events/new", json=TEST_CREATE_EVENT_ENTRY)
    assert response.status_code == status.HTTP_201_CREATED


def test_get_events(client: TestClient):
    response = client.get("api/music/events")
    assert response.status_code == status.HTTP_200_OK
    assert any(response.json())


# TODO: Return to this once puts are replaced with patches
def test_update_event(client: TestClient):
    pass
