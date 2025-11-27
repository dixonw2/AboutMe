import datetime


TEST_FAIL_ID = 0

# region Favorites
TEST_FAVORITE_ENTRY_YEAR = datetime.datetime.now().year + 1
TEST_FAVORITE_NEW_SONG = {
    "songName": "Test Song",
    "artist": "Test Artist",
    "album": "Test Album",
    "genre": "Rock",
    "songLength": "00:04:05",
    "appleMusicLink": "test link",
    "spotifyLink": "test link",
}
TEST_CREATE_FAVORITE_ENTRY = {
    "songs": [
        {**TEST_FAVORITE_NEW_SONG, "songName": f"Test Song {i + 1}"} for i in range(13)
    ],
    "comment": "Test String",
    "year": TEST_FAVORITE_ENTRY_YEAR,
}
# endregion

# region Blog
TEST_CREATE_BLOG_ENTRY = {
    "albumName": "Test Album",
    "artist": "Test Artist",
    "genre": "Rock",
    "review": "This album rocks",
    "rating": 6,
    "appleMusicLink": "test link",
    "spotifyLink": "test link",
    "releaseDate": "2025-11-21",
    "albumArtPath": "test path",
    "songs": [
        {"songName": f"Test Song{i+1}", "songLength": "05:47:36"} for i in range(8)
    ],
}
# endregion

# region Events
TEST_CREATE_EVENT_ENTRY = {
    "eventName": "Test Event",
    "headliner": "Test Headliner",
    "date": "2025-11-21",
    "venue": "Test Venue",
    "artists": [f"Test Artist {i + 1}" for i in range(5)],
}
# endregion
