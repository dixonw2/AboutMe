import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete
from datetime import time

from app.database import Base
from tests.conftest import TestingSessionLocal, test_engine
from app.models.music import Artist, ArtistsEvents, Event
from fastapi import status
from tests.constants import TEST_FAIL_ID, TEST_CREATE_EVENT_ENTRY
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


def test_create_event(client: TestClient):
    test_event = EventWithArtistsCreate(
        event_name=TEST_CREATE_EVENT_ENTRY["eventName"] + "New",
        headliner=TEST_CREATE_EVENT_ENTRY["headliner"] + "New",
        date=TEST_CREATE_EVENT_ENTRY["date"],
        venue=TEST_CREATE_EVENT_ENTRY["venue"],
        artists=[artist + "New" for artist in TEST_CREATE_EVENT_ENTRY["artists"]],
    )
    response = client.post(
        "api/music/events/new", json=test_event.model_dump(mode="json")
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["id"]


def test_get_events(client: TestClient):
    response = client.get("api/music/events")
    assert response.status_code == status.HTTP_200_OK
    assert any(response.json())


def test_set_order(client: TestClient):
    response = client.get("api/music/events")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert all(
        artist["setOrder"] == i + 1
        for i, artist in enumerate(response.json()[0]["artists"])
    )


def test_get_artists(client: TestClient):
    response = client.get("api/music/events/artists")
    assert response.status_code == status.HTTP_200_OK
    assert any(response.json())


def test_update_event(client: TestClient):
    data = client.get("api/music/events").json()[0]
    assert len(data["artists"]) == 5

    update_data = {
        "eventName": "Update Event",
        "artists": [f"Update Artist {i + 1}" for i in range(8)],
    }

    response = client.patch(f"api/music/events/update/{data["id"]}", json=update_data)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()["artists"]) == 8
    assert response.json()["eventName"] == "Update Event"
    assert all(
        artist["artist"] == f"Update Artist {i + 1}"
        for i, artist in enumerate(response.json()["artists"])
    )


def test_fail_update_event(client: TestClient):
    update_data = {
        "eventName": "Update Event",
        "artists": [f"Update Artist {i + 1}" for i in range(8)],
    }
    response = client.patch(f"api/music/events/update/{TEST_FAIL_ID}", json=update_data)
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"] == f"Event not found with id {TEST_FAIL_ID}"
