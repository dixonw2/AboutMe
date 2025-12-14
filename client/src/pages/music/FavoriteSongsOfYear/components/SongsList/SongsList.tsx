import { useState } from "react";
import type { Song } from "@/types/favorite-songs/Song";

import styles from "./SongsList.module.css";

const SongsList = ({ songs, year }: { songs: Song[]; year: number }) => {
  return (
    <div className={styles.tableContainer}>
      <table
        className={styles.songsTable}
        aria-label={`Favorite Songs of ${year}`}
      >
        <thead>
          <tr>
            <th />
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <SongRow key={song.id} song={song} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SongRow = ({ song, index }: { song: Song; index: number }) => {
  const [showLinks, setShowLinks] = useState(false);

  const handleClick = () => {
    setShowLinks((prev) => !prev);
  };

  return (
    <>
      <tr
        key={`${song.songName}-${song.artist}`}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <td className={styles.indexCell}>{index}.</td>
        <td>{song.songName}</td>
        <td>{song.artist}</td>
        <td>{song.album}</td>
        <td>{song.genre}</td>
        <td>{song.songLength.replace(/^00:(0?)/, "").replace(/^0/, "")}</td>
      </tr>
      {showLinks && (
        <tr>
          <td colSpan={3} style={{ textAlign: "center" }}>
            <a
              className={styles.link}
              href={song.appleMusicLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple Music
            </a>
          </td>
          <td colSpan={3} style={{ textAlign: "center" }}>
            <a
              className={styles.link}
              href={song.spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify
            </a>
          </td>
        </tr>
      )}
    </>
  );
};

export default SongsList;
