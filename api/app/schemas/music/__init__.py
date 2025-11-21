from .favorite_songs.song import SongRead, SongCreate
from .favorite_songs.comment import (
    CommentRead,
    CommentCreate,
    CommentUpdate,
    CommentWithSongsRead,
    CommentWithSongsCreate,
)

from .events.artists_events import (
    ArtistAtEventRead,
    ArtistsEventsRead,
    EventWithArtistsRead,
    ArtistWithEventsRead,
    EventForArtistRead,
)
from .events.artist import ArtistRead
from .events.event import EventRead

from .blog.album import AlbumRead as BlogAlbumRead
from .blog.album import AlbumCreate as BlogAlbumCreate
from .blog.album import AlbumWithSongsRead as BlogAlbumWithSongsRead
from .blog.song import SongRead as BlogSongRead
from .blog.song import SongCreate as BlogSongCreate
