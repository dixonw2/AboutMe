import { useState } from "react";
import type Year from "@/types/favorite-songs/Year";
import type Song from "@/types/favorite-songs/Song";
import { convertToTime } from "@/utils/date-time";

import styles from "@/pages/music/FavoriteSongsOfYear/FavoriteSongsOfYear.module.css";

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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label htmlFor="year">Year:</label>
      <input id="year" value={year} disabled className={styles.yearInput} />
      <CurrentSongs songs={songs} />
      {songs.length < 13 && <SongInput onAdd={addSong} currentSongs={songs} />}
      <label style={{ display: "block" }} htmlFor="comment">
        Comment:
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={styles.commentBox}
      />
      <button
        type="submit"
        disabled={!canSubmit()}
        className={styles.buttonPrimary}
      >
        Submit
      </button>
    </form>
  );
};

const CurrentSongs = ({ songs }: { songs: Song[] }) => {
  return (
    <ol className={styles.songsList}>
      {songs.map((song) => (
        <li key={song.songName}>{song.songName}</li>
      ))}
    </ol>
  );
};

const SongInput = ({
  onAdd,
  currentSongs,
}: {
  onAdd: (song: Song) => void;
  currentSongs: Song[];
}) => {
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
      songName: song.trim(),
      artist: artist.trim(),
      album: album.trim(),
      genre: genre.trim(),
      songLength: length.trim(),
      appleMusicLink: appleMusicLink.trim(),
      spotifyLink: spotifyLink.trim(),
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

    const validateDuplicate = () => {
      return !currentSongs.find((s) => s.artist === artist);
    };

    return (
      song.length > 0 &&
      artist.length > 0 &&
      album.length > 0 &&
      genre.length > 0 &&
      validateSongLength() &&
      appleMusicLink.length > 0 &&
      spotifyLink.length > 0 &&
      validateDuplicate()
    );
  };

  return (
    <div className={styles.grid}>
      <div className={styles.linkRow}>
        <InputField id="song" value={song} onChange={setSong}>
          Song:
        </InputField>
        <InputField id="artist" value={artist} onChange={setArtist}>
          Artist:
        </InputField>
      </div>
      <div className={styles.linkRow}>
        <InputField id="album" value={album} onChange={setAlbum}>
          Album:
        </InputField>
        <InputField id="genre" value={genre} onChange={setGenre}>
          Genre:
        </InputField>
      </div>
      <InputField id="length" value={length} onChange={setLength}>
        Length:
      </InputField>
      <div className={styles.linkRow}>
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
      </div>
      <button
        onClick={addSong}
        disabled={!validateSong()}
        className={styles.addSongButton}
      >
        Add Song
      </button>
    </div>
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
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{children}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default NewYear;
