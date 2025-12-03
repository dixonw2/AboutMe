import { useState } from "react";
import type Year from "@/types/favorite-songs/Year";
import type Song from "@/types/favorite-songs/Song";
import { convertToTime } from "@/utils/date-time";

const NewYear = ({ onCreate }: { onCreate: (year: Year) => void }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [comment, setComment] = useState("");
  const year = new Date().getFullYear();

  const addSong = (song: Song) => {
    setSongs((songs) => [...songs, song]);
  };

  const canSubmit = () => {
    const uniqueSongs = new Set<string>();
    for (const song of songs) {
      uniqueSongs.add(`${song.songName}::${song.artist}`);
    }

    return (
      songs.length === 13 &&
      comment.trim().length > 0 &&
      uniqueSongs.size === 13
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newYear = JSON.stringify({
      comment: comment,
      year: year,
      songs: songs.map((song) => ({
        ...song,
        songLength: convertToTime(song.songLength),
      })),
    });

    const response = await fetch("api/music/favorite-songs/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newYear,
    });

    if (response.ok) {
      const data: Year = await response.json();
      onCreate(data);
      setSongs([]);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="year">Year:</label>
      <input id="year" value={year} disabled />
      <CurrentSongs songs={songs} />
      {songs.length < 13 && <SongInput onAdd={addSong} />}
      <label style={{ display: "block" }} htmlFor="comment">
        Comment:
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" disabled={!canSubmit()}>
        Submit
      </button>
    </form>
  );
};

const CurrentSongs = ({ songs }: { songs: Song[] }) => {
  return (
    <div>
      <ol>
        {songs.map((song) => (
          <li key={song.songName}>{song.songName}</li>
        ))}
      </ol>
    </div>
  );
};

const SongInput = ({ onAdd }: { onAdd: (song: Song) => void }) => {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [length, setLength] = useState("");
  const [appleMusicLink, setAppleMusicLink] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");

  const addSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newSong: Song = {
      songName: song,
      artist: artist,
      album: album,
      genre: genre,
      songLength: length,
      appleMusicLink: appleMusicLink,
      spotifyLink: spotifyLink,
    };
    onAdd(newSong);
    setSong("");
    setArtist("");
    setAlbum("");
    setGenre("");
    setLength("");
    setAppleMusicLink("");
    setSpotifyLink("");
  };

  const validateSong = () => {
    const validateSongLength = () => {
      return length.match(/^(\d+):(\d{2})$/);
    };

    return (
      song.length > 0 &&
      artist.length > 0 &&
      album.length > 0 &&
      genre.length > 0 &&
      validateSongLength() &&
      appleMusicLink.length > 0 &&
      spotifyLink.length > 0
    );
  };

  return (
    <>
      <InputField id="song" value={song} onChange={setSong}>
        Song:
      </InputField>
      <InputField id="artist" value={artist} onChange={setArtist}>
        Artist:
      </InputField>
      <InputField id="album" value={album} onChange={setAlbum}>
        Album:
      </InputField>
      <InputField id="genre" value={genre} onChange={setGenre}>
        Genre:
      </InputField>
      <InputField id="length" value={length} onChange={setLength}>
        Length:
      </InputField>
      <InputField
        id="apple-music"
        value={appleMusicLink}
        onChange={setAppleMusicLink}
      >
        Apple Music Link:
      </InputField>
      <InputField id="spotify" value={spotifyLink} onChange={setSpotifyLink}>
        Spotify Link:
      </InputField>
      <button onClick={addSong} disabled={!validateSong()}>
        Add Song
      </button>
    </>
  );
};

const InputField = ({
  children,
  id,
  value,
  onChange,
}: {
  children: React.ReactNode;
  id: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
      />
    </>
  );
};

export default NewYear;
