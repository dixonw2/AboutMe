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
    EventWithArtistsCreate,
    EventWithArtistsUpdate,
)

from .blog.album import AlbumCreate, AlbumRead, AlbumUpdate
from .blog.song import SongCreate, SongRead, SongUpdate

from .events.artist import ArtistRead, ArtistCreate
from .events.event import EventRead, EventCreate
