from fastapi.testclient import TestClient
from fastapi import status

TEST_TRIPLE_TRIAD_LIST_COUNT = 110


# cards is static data, so no need to refresh the database with new data every time
def test_get_cards(client: TestClient):
    response = client.get("api/games/triple-triad/cards")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == TEST_TRIPLE_TRIAD_LIST_COUNT


def test_get_cards_of_level(client: TestClient):
    response = client.get("api/games/triple-triad/cards", params={"level": 10})
    assert response.status_code == status.HTTP_200_OK
    assert all(card["level"] == 10 for card in response.json())


def test_get_cards_of_element(client: TestClient):
    response = client.get(
        "api/games/triple-triad/cards", params={"element": "Lightning"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert all(card["element"] == "Lightning" for card in response.json())


def test_get_cards_of_no_element(client: TestClient):
    response = client.get("api/games/triple-triad/cards", params={"element": ""})
    assert any(response.json())
    assert all(card["element"] is None for card in response.json())


def test_get_random_cards(client: TestClient):
    response = client.get("api/games/triple-triad/cards/random", params={"count": 60})
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 60


def test_fail_get_random_cards(client: TestClient):
    response = client.get("api/games/triple-triad/cards/random", params={"count": 120})
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_get_hand(client: TestClient):
    response = client.get("api/games/triple-triad/cards/random/hand")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 5


def test_get_hand_unweighted(client: TestClient):
    response = client.get(
        "api/games/triple-triad/cards/random/hand", params={"weighted": False}
    )
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 5
