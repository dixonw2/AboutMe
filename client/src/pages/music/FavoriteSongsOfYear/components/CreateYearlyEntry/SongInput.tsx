import { useState } from "react";
import InputField from "@/components/InputField/InputField";

import type { Song } from "@/types/favorite-songs/Song";

import styles from "./SongInput.module.css";
import { validateSongLength } from "@/utils/date-time";

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
    const validateDuplicate = () => {
      return !currentSongs.find(
        (s) => s.artist.toLowerCase() === artist.toLowerCase()
      );
    };

    return (
      song.length > 0 &&
      artist.length > 0 &&
      album.length > 0 &&
      genre.length > 0 &&
      validateSongLength(length) &&
      appleMusicLink.length > 0 &&
      spotifyLink.length > 0 &&
      validateDuplicate()
    );
  };

  return (
    <div>
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

export default SongInput;
