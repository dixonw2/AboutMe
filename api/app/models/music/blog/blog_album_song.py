from sqlalchemy import Column, ForeignKey, Integer, String, Time, UniqueConstraint
from database import Base
from sqlalchemy.orm import relationship


class BlogAlbumSong(Base):
    __tablename__ = "BlogAlbumSongs"
    __table_args__ = ({"schema": "Music"},)

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    song_name = Column("SongName", String(256), nullable=False)
    song_length = Column("SongLength", Time, nullable=False)
    id_blog_albums = Column(
        "IdBlogAlbums",
        Integer,
        ForeignKey("Music.BlogAlbums.Id"),
        index=True,
        nullable=False,
    )

    album = relationship("BlogAlbum", back_populates="songs")
