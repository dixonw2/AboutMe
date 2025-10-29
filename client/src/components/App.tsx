import { useEffect, useState } from "react";
//import "./App.css";
import SongsTable from "./music/favorite-songs/SongsTable";
import Comment from "./music/favorite-songs/Comment";

import type Song from "@/types/Song";
import type Year from "@/types/Year";
import type EventArtists from "@/types/EventArtists";
import type TripleTriadCard from "@/types/TripleTriadCard";

import Events from "./music/events/EventsList";
import Card from "./games/triple-triad/Card";

const App = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [events, setEvents] = useState<EventArtists[]>([]);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<TripleTriadCard[]>([]);
  const [showOpponents, setShowOpponents] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [toggleTripleTriad, setToggleTripleTriad] = useState(true);
  const [eventFilter, setEventFilter] = useState("");

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

    const getCards = async () => {
      const res = await fetch("api/triple-triad/cards");
      const data = await res.json();
      setCards(data);
    };

    getSongs();
    getEvents();
    getCards();
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

  const handleToggleCardOwnership = () => {
    setShowOpponents((prev) => !prev);
  };

  const handleToggleTripleTriad = () => {
    setToggleTripleTriad((prev) => !prev);
  };

  const nameFilter = events.filter((x) =>
    x.eventName?.toLowerCase().includes(eventFilter.toLowerCase())
  );
  const artistFilter = events.filter((x) =>
    x.artists.some((y) =>
      y.artist.toLowerCase().includes(eventFilter.toLowerCase())
    )
  );
  const eventNameFilter = events.filter((x) =>
    x.eventName?.toLowerCase().includes(eventFilter.toLowerCase())
  );
  const venueFilter = events.filter((x) =>
    x.venue?.toLowerCase().includes(eventFilter.toLowerCase())
  );

  const filteredList = [
    ...new Set([
      ...nameFilter,
      ...artistFilter,
      ...eventNameFilter,
      ...venueFilter,
    ]),
  ];

  if (toggleTripleTriad) {
    return (
      <>
        <title>Triple Triad</title>
        <Button onClick={handleToggleTripleTriad}>
          {toggleTripleTriad ? "Music" : "Triple Triad"}
        </Button>
        <div>
          <Button onClick={handleToggleCardOwnership}>Toggle Cards</Button>
        </div>
        {cards.map((card) => (
          <Card key={card.id} card={card} opponent={showOpponents} />
        ))}
      </>
    );
  } else {
    return (
      <>
        <title>{showFavorites ? "Favorite Songs" : "Events"}</title>
        <Button onClick={handleToggleTripleTriad}>
          {toggleTripleTriad ? "Music" : "Triple Triad"}
        </Button>
        <br />
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
            <input
              type="text"
              value={eventFilter}
              placeholder="Search..."
              onChange={(e) => setEventFilter(e.target.value)}
            />
            <div>
              {filteredList.length} result{filteredList.length === 1 ? "" : "s"}
            </div>
            <Events events={filteredList} />
          </div>
        )}
      </>
    );
  }
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
