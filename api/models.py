from database import Base
from sqlalchemy import Column, Integer, String, Time, PrimaryKeyConstraint

class Songs(Base):
    __tablename__ = 'Songs'
    
    song_name = Column('SongName', String(256), index=True, nullable=False)
    artist = Column('Artist', String(128), index=True, nullable=False)
    album = Column('Album', String(128), index=True, nullable=False)
    genre = Column('Genre', String(32), index=True, nullable=False)
    song_length = Column('SongLength', Time, index=True, nullable=False)
    apple_music_link = Column('AppleMusicLink', String(256), index=True, nullable=False)
    spotify_link = Column('SpotifyLink', String(256), index=True, nullable=False)
    year = Column('Year', Integer, index=True, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('SongName', 'Artist'),
    )

class YearsComments(Base):
    __tablename__ = 'YearsComments'

    year = Column('Year', Integer, primary_key=True, index=True)
    comment = Column('Comment', String, index=True, nullable=False)
