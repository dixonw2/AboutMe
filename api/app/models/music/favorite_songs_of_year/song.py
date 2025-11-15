from sqlalchemy import Column, ForeignKey, Integer, String, Time, UniqueConstraint
from database import Base


class Song(Base):
    __tablename__ = "FavoriteSongsOfYear"
    __table_args__ = (
        UniqueConstraint("SongName", "Artist", name="UN_FavoriteSongsOfYear"),
        {"schema": "Music"},
    )

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    song_name = Column("SongName", String(256), nullable=False)
    artist = Column("Artist", String(128), nullable=False)
    album = Column("Album", String(128), nullable=False)
    genre = Column("Genre", String(32), index=True, nullable=False)
    song_length = Column("SongLength", Time, nullable=False)
    apple_music_link = Column("AppleMusicLink", String(256), nullable=False)
    spotify_link = Column("SpotifyLink", String(256), nullable=False)
    year = Column(
        "Year",
        Integer,
        ForeignKey("Music.FavoriteSongsOfYearComments.Year"),
        index=True,
        nullable=False,
    )
