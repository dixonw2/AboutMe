import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete
from datetime import time

from app.database import Base
from tests.conftest import TestingSessionLocal, test_engine
from app.models.music import FavoritesComment, FavoritesSong
from fastapi import status
from tests.constants import (
    TEST_CREATE_FAVORITE_ENTRY,
    TEST_FAVORITE_ENTRY_YEAR,
    TEST_FAVORITE_NEW_SONG,
)

import pytest


@pytest.fixture(autouse=True)
def reset_test_favorite_entries():
    tables_to_reset = [FavoritesComment.__table__, FavoritesSong.__table__]
    with test_engine.begin() as conn:
        for table in tables_to_reset:
            conn.execute(delete(table))

    session = TestingSessionLocal()
    try:
        favorite = FavoritesComment(
            comment=TEST_CREATE_FAVORITE_ENTRY["comment"],
            year=TEST_CREATE_FAVORITE_ENTRY["year"],
        )
        for s in TEST_CREATE_FAVORITE_ENTRY["songs"]:
            # Convert string "HH:MM:SS" to datetime.time
            h, m, sec = s["songLength"].split(":")
            song = FavoritesSong(
                song_name=s["songName"],
                artist=s["artist"],
                album=s["album"],
                genre=s["genre"],
                song_length=time(hour=int(h), minute=int(m), second=int(sec)),
                apple_music_link=s["appleMusicLink"],
                spotify_link=s["spotifyLink"],
                year=TEST_CREATE_FAVORITE_ENTRY["year"],
            )
            favorite.songs.append(song)

        session.add(favorite)
        session.commit()
        yield favorite
    finally:
        session.close()


def test_create_favorite_songs(client: TestClient):
    response = client.post(
        "api/music/favorite-songs/new",
        json={
            **TEST_CREATE_FAVORITE_ENTRY,
            "songs": [
                {**song, "songName": song["songName"] + "New"}
                for song in TEST_CREATE_FAVORITE_ENTRY["songs"]
            ],
            "year": TEST_FAVORITE_ENTRY_YEAR + 1,
        },
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert all(song["id"] > 0 for song in response.json()["songs"])


def test_fail_create_favorite_songs(client: TestClient):
    test_fail = {
        **TEST_CREATE_FAVORITE_ENTRY,
        "songs": [
            {**song, "songName": song["songName"] + "New"}
            for song in TEST_CREATE_FAVORITE_ENTRY["songs"]
        ],
        "year": TEST_FAVORITE_ENTRY_YEAR + 1,
    }
    test_fail["songs"].pop()
    response = client.post("api/music/favorite-songs/new", json=test_fail)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert (
        response.json()["detail"]
        == f"Needs exactly 13 songs (currently {len(test_fail["songs"])})"
    )


def test_fail_create_favorite_songs_duplicate(client: TestClient):
    response = client.post(
        "api/music/favorite-songs/new", json={**TEST_CREATE_FAVORITE_ENTRY}
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert (
        response.json()["detail"]
        == f"Could not add new list for year {TEST_CREATE_FAVORITE_ENTRY["year"]}"
    )


def test_get_favorite_songs(client: TestClient):
    response = client.get("api/music/favorite-songs")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()[0]["songs"]) == 13


def test_update_comment(client: TestClient):
    UPDATE_STRING = "This has been updated"
    TEST_UPDATE_FAVORITE = {
        "comment": UPDATE_STRING,
        "songs": [
            {**song, "songName": f"Update Song {i + 1}"}
            for i, song in enumerate(TEST_CREATE_FAVORITE_ENTRY["songs"])
        ],
    }
    response = client.patch(
        f"api/music/favorite-songs/comments/update/{TEST_FAVORITE_ENTRY_YEAR}",
        json=TEST_UPDATE_FAVORITE,
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["comment"] == UPDATE_STRING


def test_fail_update_comment(client: TestClient):
    update_data = {"comment": "Update Test"}
    response = client.patch(
        f"api/music/favorite-songs/comments/update/{TEST_FAVORITE_ENTRY_YEAR + 1}",
        json=update_data,
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_fail_update_comment_not_enough_songs(client: TestClient):
    TEST_UPDATE_FAVORITE_SONGS = [
        {**TEST_FAVORITE_NEW_SONG, "songName": f"Update Song {i + 1}"}
        for i in range(12)
    ]
    response = client.patch(
        f"api/music/favorite-songs/comments/update/{TEST_FAVORITE_ENTRY_YEAR}",
        json={"songs": TEST_UPDATE_FAVORITE_SONGS},
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert (
        response.json()["detail"]
        == f"Needs exactly 13 songs (currently {len(TEST_UPDATE_FAVORITE_SONGS)})"
    )


def test_delete_comment(client: TestClient):
    response = client.delete(
        f"api/music/favorite-songs/delete/{TEST_FAVORITE_ENTRY_YEAR}"
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT

    data = client.get("api/music/favorite-songs").json()
    assert not any(data) or all(
        entry["year"] != TEST_FAVORITE_ENTRY_YEAR for entry in data
    )


def test_fail_delete_comment(client: TestClient):
    response = client.delete(
        f"api/music/favorite-songs/delete/{TEST_FAVORITE_ENTRY_YEAR + 1}"
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
