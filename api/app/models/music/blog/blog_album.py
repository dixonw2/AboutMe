from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    DateTime,
    UniqueConstraint,
    func,
)
from app.database import Base
from sqlalchemy.orm import relationship


class BlogAlbum(Base):
    __tablename__ = "BlogAlbums"
    __table_args__ = (
        UniqueConstraint("AlbumName", "Artist", name="UN_BlogAlbums"),
        {"schema": "Music"},
    )

    id = Column("Id", Integer, primary_key=True, autoincrement=True)
    album_name = Column("AlbumName", String(128), nullable=False)
    artist = Column("Artist", String(128), index=True, nullable=False)
    genre = Column("Genre", String(32), index=True, nullable=False)
    review = Column("Review", Text, nullable=False)
    rating = Column("Rating", Integer, nullable=False)
    apple_music_link = Column("AppleMusicLink", String(256), nullable=False)
    spotify_link = Column("SpotifyLink", String(256), nullable=False)
    release_date = Column("ReleaseDate", Date, nullable=False)
    album_art_path = Column("AlbumArtPath", String(128), nullable=False)
    date_created = Column(
        "DateCreated",
        DateTime,
        nullable=False,
        server_default=func.sysutcdatetime(),
    )

    songs = relationship(
        "BlogAlbumSong",
        back_populates="album",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
