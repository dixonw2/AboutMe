import InputField from "@/components/InputField/InputField";
import type { Song } from "@/types/blog/Song";
import { validateSongLength } from "@/utils/date-time";
import { useState } from "react";

const CreateBlogEntry = () => {
  const [albumName, setAlbumName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [review, setReview] = useState("");
  const [appleMusicLink, setAppleMusicLink] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [albumArtPath, setAlbumArtPath] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);

  const vals = songs.map((song) => song.songRating);
  const rating = vals.length
    ? vals.reduce((a, b) => a + b, 0) / vals.length
    : 0;

  const handleAddSong = (song: Song) => {
    setSongs((prev) => [...prev, song]);
  };

  return (
    <form>
      <label htmlFor="rating">Overall rating: </label>
      <input id="rating" value={rating} disabled={true} />
      <InputField id="album" value={albumName} onChange={setAlbumName}>
        Album
      </InputField>
      <InputField id="artist" value={artist} onChange={setArtist}>
        Artist
      </InputField>
      <InputField id="genre" value={genre} onChange={setGenre}>
        Genre
      </InputField>
      <InputField id="review" value={review} onChange={setReview}>
        Review
      </InputField>
      <InputField
        id="appleMusic"
        value={appleMusicLink}
        onChange={setAppleMusicLink}
      >
        Apple Music
      </InputField>
      <InputField id="spotify" value={spotifyLink} onChange={setSpotifyLink}>
        Spotify
      </InputField>
      <InputField id="release" value={releaseDate} onChange={setReleaseDate}>
        Release Date
      </InputField>
      <InputField
        id="albumArtPath"
        value={albumArtPath}
        onChange={setAlbumArtPath}
      >
        Album Art
      </InputField>
      <hr style={{ marginTop: "2rem" }} />
      <CurrentSongs songs={songs} />
      <SongInput onInput={handleAddSong} currentSongs={songs} />
    </form>
  );
};

const CurrentSongs = ({ songs }: { songs: Song[] }) => {
  return (
    <div>
      {songs.map((song) => (
        <div key={song.songName}>
          <h2>{song.songName}</h2>
          <h5>
            {song.songLength} {song.songRating}
          </h5>
        </div>
      ))}
    </div>
  );
};

const SongInput = ({
  onInput,
  currentSongs,
}: {
  onInput: (song: Song) => void;
  currentSongs: Song[];
}) => {
  const [songName, setSongName] = useState("");
  const [songLength, setSongLength] = useState("");
  const [songRating, setSongRating] = useState(1);

  const handleAddSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onInput({ songName, songLength, songRating });
    setSongName("");
    setSongLength("");
    setSongRating(1);
  };

  const validateSong = () => {
    const validateDuplicate = () => {
      return !currentSongs.find(
        (s) => s.songName.toLowerCase() === songName.toLowerCase()
      );
    };

    return (
      songName.length > 0 &&
      validateDuplicate() &&
      validateSongLength(songLength)
    );
  };

  return (
    <div>
      <InputField id="name" value={songName} onChange={setSongName}>
        Song Name
      </InputField>
      <InputField id="length" value={songLength} onChange={setSongLength}>
        Length
      </InputField>
      <label htmlFor="rating">Rating: {songRating}</label>
      <input
        id="rating"
        type="range"
        min={1}
        max={10}
        value={songRating}
        onChange={(e) => setSongRating(Number(e.target.value))}
      />
      <button disabled={!validateSong()} onClick={handleAddSong}>
        Add Song
      </button>
    </div>
  );
};

export default CreateBlogEntry;
