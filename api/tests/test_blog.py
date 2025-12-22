import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete
from datetime import time

from tests.conftest import TestingSessionLocal, test_engine
from app.models.music import BlogAlbum, BlogAlbumSong
from fastapi import status
from tests.constants import TEST_CREATE_BLOG_ENTRY, TEST_FAIL_ID


@pytest.fixture(autouse=True)
def reset_test_blog():
    tables_to_reset = [BlogAlbumSong.__table__, BlogAlbum.__table__]
    with test_engine.begin() as conn:
        for table in tables_to_reset:
            conn.execute(delete(table))

    session = TestingSessionLocal()
    try:
        album = BlogAlbum(
            album_name=TEST_CREATE_BLOG_ENTRY["albumName"],
            artist=TEST_CREATE_BLOG_ENTRY["artist"],
            genre=TEST_CREATE_BLOG_ENTRY["genre"],
            review=TEST_CREATE_BLOG_ENTRY["review"],
            rating=TEST_CREATE_BLOG_ENTRY["rating"],
            apple_music_link=TEST_CREATE_BLOG_ENTRY["appleMusicLink"],
            spotify_link=TEST_CREATE_BLOG_ENTRY["spotifyLink"],
            release_date=TEST_CREATE_BLOG_ENTRY["releaseDate"],
            album_art_path=TEST_CREATE_BLOG_ENTRY["albumArtPath"],
        )
        for s in TEST_CREATE_BLOG_ENTRY["songs"]:
            # Convert string "HH:MM:SS" to datetime.time
            h, m, sec = s["songLength"].split(":")
            song = BlogAlbumSong(
                song_name=s["songName"],
                song_length=time(hour=int(h), minute=int(m), second=int(sec)),
                song_rating=s["songRating"],
            )
            album.songs.append(song)

        session.add(album)
        session.commit()
        yield album
    finally:
        session.close()


def test_create_blog(client: TestClient):
    response = client.post(
        "api/music/blog/albums/new",
        json={**TEST_CREATE_BLOG_ENTRY, "albumName": "New Album"},
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert len(data["songs"]) > 0
    assert data["albumName"] == "New Album"


def test_fail_create_blog_empty_songs(client: TestClient):
    data = {**TEST_CREATE_BLOG_ENTRY, "songs": []}
    response = client.post("api/music/blog/albums/new", json=data)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "Songs cannot be empty"


def test_fail_create_blog_duplicate(client: TestClient):
    response = client.post("api/music/blog/albums/new", json=TEST_CREATE_BLOG_ENTRY)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert (
        response.json()["detail"]
        == f"Could not insert album {TEST_CREATE_BLOG_ENTRY["albumName"]}"
    )


def test_get_blog(client: TestClient):
    response = client.get("api/music/blog")
    assert response.status_code == status.HTTP_200_OK
    assert any(response.json())


def test_update_blog(client: TestClient):
    data = client.get("api/music/blog").json()[0]
    assert len(data["songs"]) == 8

    update_data = {
        "albumName": "Update Album Name",
        "songs": [
            {"songName": f"Update Song {i + 1}", "songRating": 6, "songLength": "04:20:00"}
            for i in range(13)
        ],
    }
    response = client.patch(
        f"api/music/blog/albums/update/{data["id"]}", json=update_data
    )
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()["songs"]) == 13
    assert all(
        song["songName"] == f"Update Song {i + 1}"
        for i, song in enumerate(response.json()["songs"])
    )
    assert response.json()["albumName"] == "Update Album Name"


def test_fail_update_blog(client: TestClient):
    update_data = {"albumName": "Update Album Name"}
    response = client.patch(
        f"api/music/blog/albums/update/{TEST_FAIL_ID}", json=update_data
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"].startswith("Blog entry not found with id")


def test_delete_album(client: TestClient):
    blog_id = client.get("api/music/blog").json()[0]["id"]
    response = client.delete(f"api/music/blog/albums/delete/{blog_id}")
    assert response.status_code == status.HTTP_204_NO_CONTENT
    data = client.get("api/music/blog").json()
    assert not any(data)


def test_fail_delete_album_not_found(client: TestClient):
    response = client.delete(f"api/music/blog/albums/delete/{TEST_FAIL_ID}")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"].startswith("Album not found with id")
