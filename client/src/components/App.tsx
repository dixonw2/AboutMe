import { useEffect, useState } from "react";
import "./App.css";
import SongsTable from "./music/favorite-songs/SongsTable";
import Comment from "./music/favorite-songs/Comment";
import type Song from "../types/Song";
import type Year from "../types/Year";

const App = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSongs = async () => {
      const [songsRes, yearsRes] = await Promise.all([
        fetch("api/music/favorite-songs/songs"),
        fetch("api/music/favorite-songs/comments"),
      ]);

      const [songList, yearsList] = await Promise.all([
        songsRes.json(),
        yearsRes.json(),
      ]);

      setSongs(songList);
      setYears(yearsList);
      setLoading(false);
    };

    getSongs();
  }, []);

  if (loading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

  return (
    <>
      <div>
        {years.map((year) => (
          <div key={year.year}>
            <Comment year={year.year}>{year.comment}</Comment>
            <SongsTable
              songs={songs.filter((song) => song.year === year.year)}
              year={year.year}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
