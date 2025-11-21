import datetime

TEST_YEAR = datetime.datetime.now().year + 3

TEST_CREATE_FAVORITE = {
    "songs": [
        {
            "songName": f"Test Song{i+1}",
            "artist": "Test Artist",
            "album": "Test Album",
            "genre": "Rock",
            "songLength": "00:04:05",
            "appleMusicLink": "test link",
            "spotifyLink": "test link",
        }
        for i in range(13)
    ],
    "comment": "Test String",
    "year": TEST_YEAR,
}
