import { useState } from "react";
import { convertToTime } from "@/utils/date-time";
import SongInput from "./SongInput";

import type { Year } from "@/types/favorite-songs/Year";
import type { Song } from "@/types/favorite-songs/Song";

import styles from "./CreateYearlyEntry.module.css";
import SongsList from "../SongsList/SongsList";

const NewYear = ({ onCreate }: { onCreate: (year: Year) => void }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [comment, setComment] = useState("");
  const year = new Date().getFullYear();

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
      <SongsList songs={songs} year={year} />
      {songs.length < 13 && (
        <SongInput
          onAdd={(song: Song) => setSongs([...songs, song])}
          currentSongs={songs}
        />
      )}
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

export default NewYear;
