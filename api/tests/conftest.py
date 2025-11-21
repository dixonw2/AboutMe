import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, delete
from sqlalchemy.orm import sessionmaker
from datetime import datetime, time

# api/tests/conftest.py
import sys
import os

# Add api/ folder to Python path so 'app' can be imported
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.database import Base, TESTING_DATABASE_URL, get_db, SessionLocal
from app.models.music import FavoritesComment, FavoritesSong
from tests.constants import TEST_CREATE_FAVORITE
import pytest


# Create test engine
test_engine = create_engine(TESTING_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

# Create tables once for entire test session
Base.metadata.create_all(bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


# Override FastAPI's default DB dependency
app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    return TestClient(app)


# Resets the DB with test data before each test
@pytest.fixture(autouse=True)
def setup_test_favorite():
    with test_engine.begin() as conn:
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(delete(table))

    session = TestingSessionLocal()
    try:
        favorite = FavoritesComment(
            comment=TEST_CREATE_FAVORITE["comment"], year=TEST_CREATE_FAVORITE["year"]
        )
        for s in TEST_CREATE_FAVORITE["songs"]:
            # Convert string "HH:MM:SS.sssZ" to datetime.time
            h, m, sec_frac = s["songLength"].split(":")
            sec = int(float(sec_frac))  # take only the integer seconds
            song = FavoritesSong(
                song_name=s["songName"],
                artist=s["artist"],
                album=s["album"],
                genre=s["genre"],
                song_length=time(hour=int(h), minute=int(m), second=sec),
                apple_music_link=s["appleMusicLink"],
                spotify_link=s["spotifyLink"],
                year=TEST_CREATE_FAVORITE["year"],
            )
            favorite.songs.append(song)

        session.add(favorite)
        session.commit()
        yield favorite
    finally:
        session.close()
