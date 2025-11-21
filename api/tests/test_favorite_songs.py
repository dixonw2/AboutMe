from fastapi.testclient import TestClient
from fastapi import status
from tests.constants import TEST_CREATE_FAVORITE, TEST_YEAR


def test_create_favorite_songs(client: TestClient):
    response = client.post(
        "api/music/favorite-songs/new",
        json={
            **TEST_CREATE_FAVORITE,
            "songs": [
                {**song, "songName": song["songName"] + "New"}
                for song in TEST_CREATE_FAVORITE["songs"]
            ],
            "year": TEST_YEAR + 1,
        },
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert all(song["id"] > 0 for song in data["songs"])


def test_fail_create_favorite_songs(client: TestClient):
    fail_test = {
        **TEST_CREATE_FAVORITE,
        "songs": [
            {**song, "songName": song["songName"] + "New"}
            for song in TEST_CREATE_FAVORITE["songs"]
        ],
        "year": TEST_YEAR + 1,
    }
    fail_test["songs"].pop()
    response = client.post("api/music/favorite-songs/new", json=fail_test)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"].startswith("Needs exactly 13 songs")


def test_get_favorite_songs(client: TestClient):
    response = client.get("api/music/favorite-songs")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()

    # All song lists must be 13 songs long
    assert len(data[0]["songs"]) == 13


def test_update_comment(client: TestClient):
    UPDATE_STRING = "This has been updated"
    TEST_UPDATE_FAVORITE = {"comment": UPDATE_STRING}
    response = client.put(
        f"api/music/favorite-songs/comments/update/{TEST_YEAR}",
        json=TEST_UPDATE_FAVORITE,
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["comment"] == UPDATE_STRING


def test_fail_update_comment(client: TestClient):
    TEST_UPDATE_FAVORITE = {"comment": "New Test"}
    response = client.put(
        f"api/music/favorite-songs/comments/update/{TEST_YEAR + 1}",
        json=TEST_UPDATE_FAVORITE,
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_comment(client: TestClient):
    response = client.delete(f"api/music/favorite-songs/delete/{TEST_YEAR}")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    # Ensure year is gone from list
    data = client.get("api/music/favorite-songs").json()
    assert all(entry["year"] != TEST_YEAR for entry in data)


def test_fail_delete_comment(client: TestClient):
    response = client.delete(f"api/music/favorite-songs/delete/{TEST_YEAR + 1}")
    assert response.status_code == status.HTTP_404_NOT_FOUND
