from sqlalchemy import Column, Integer, String, Time, PrimaryKeyConstraint
from database import Base


class Songs(Base):
    __tablename__ = "Songs"

    # TODO: can I do primary_key=True on multiple columns?

    song_name = Column("SongName", String(256), index=True, nullable=False)
    artist = Column("Artist", String(128), index=True, nullable=False)
    album = Column("Album", String(128), index=True, nullable=False)
    genre = Column("Genre", String(32), index=True, nullable=False)
    song_length = Column("SongLength", Time, index=True, nullable=False)
    apple_music_link = Column("AppleMusicLink", String(256), index=True, nullable=False)
    spotify_link = Column("SpotifyLink", String(256), index=True, nullable=False)
    year = Column("Year", Integer, index=True, nullable=False)

    __table_args__ = (PrimaryKeyConstraint("SongName", "Artist"),)
