import { useEffect, useState } from "react";
//import "./App.css";
import SongsTable from "./music/favorite-songs/SongsTable";
import Comment from "./music/favorite-songs/Comment";

import type Song from "@/types/Song";
import type Year from "@/types/Year";
import type EventArtists from "@/types/EventArtists";

import Events from "./music/events/EventsList";

const App = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [events, setEvents] = useState<EventArtists[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFavorites, setShowFavorites] = useState(false);

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

    const getEvents = async () => {
      const res = await fetch("api/music/events/all-artists-per-event");
      const data = await res.json();
      setEvents(data);
    };

    getSongs();
    getEvents();
  }, []);

  if (loading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

  const handleToggleEvents = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <>
      <title>{showFavorites ? "Favorite Songs" : "Events"}</title>
      <Button onClick={handleToggleEvents}>
        Show {showFavorites ? "Events" : "Favorite Songs"}
      </Button>
      {showFavorites && (
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
      )}
      {!showFavorites && (
        <div>
          <Events events={events} />
        </div>
      )}
    </>
  );
};

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return <button onClick={onClick}>{children}</button>;
};

export default App;
