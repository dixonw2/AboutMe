import React, { useEffect, useState } from "react";

export default function SongsTable({ year }) {
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSongs = async () => {
      const params = new URLSearchParams();
      if (year !== undefined && year !== null) {
        params.append("year", year);
      }
      const response = await fetch(
        `api/music/favorite-songs?${params.toString()}`
      );
      const songList = await response.json();
      setSongList(songList);
      setLoading(false);
    };

    getSongs();
  }, [year]);

  if (loading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

  if (!loading && songList.length === 0) {
    return <p>No songs found for {year}</p>;
  }

  return (
    <>
      <table
        className="table table-striped"
        aria-label={`Favorite Songs of ${year}`}
      >
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Length</th>
            <th>Apple Music</th>
            <th>Spotify</th>
          </tr>
        </thead>
        <tbody>
          {songList.map((song) => (
            <tr key={`${song.song_name}-${song.artist}`}>
              <td>{song.song_name}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td>
                {song.song_length.replace(/^00:(0?)/, "").replace(/^0/, "")}
              </td>
              <td>
                <a href={song.apple_music_link}>Apple Music</a>
              </td>
              <td>
                <a href={song.spotify_link}>Spotify</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
