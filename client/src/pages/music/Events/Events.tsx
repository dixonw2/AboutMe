import { useEffect, useState } from "react";

import type { EventWithArtists } from "@/types/events/Event";
import type { ArtistWithEvents } from "@/types/events/Artist";
import EventsList from "./components/EventsList";
import Button from "@/components/Button";
import ArtistsList from "./components/ArtistsList";

const Events = () => {
  const [events, setEvents] = useState<EventWithArtists[]>([]);
  const [artists, setArtists] = useState<ArtistWithEvents[]>([]);
  const [showArtists, setShowArtists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const [evRes, artRes] = await Promise.all([
        fetch("api/music/events"),
        fetch("api/music/events/artists"),
      ]);

      const [evData, artData] = await Promise.all([
        evRes.json(),
        artRes.json(),
      ]);
      setEvents(evData);
      setArtists(artData);
      setLoading(false);
    };

    getEvents();
  }, []);

  const handleSelectArtists = () => {
    setShowArtists(true);
  };

  const handleSelectEvents = () => {
    setShowArtists(false);
  };

  return (
    <div>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <Button selected={!showArtists} onClick={handleSelectEvents}>
            Events
          </Button>
          <Button selected={showArtists} onClick={handleSelectArtists}>
            Artists
          </Button>
          {showArtists ? (
            <ArtistsList artists={artists} />
          ) : (
            <EventsList events={events} />
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
