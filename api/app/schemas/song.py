from models.about_me_model import AboutMeModel
import datetime


class SongSchema(AboutMeModel):
    song_name: str = None
    artist: str = None
    album: str = None
    genre: str = None
    song_length: datetime.time = None
    apple_music_link: str = None
    spotify_link: str = None
    year: int = None
