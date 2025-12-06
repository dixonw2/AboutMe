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
  const title = showArtists ? "Artists" : "Events";

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

  return (
    <div>
      <title>{title}</title>
      <h1>{title}</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <Button selected={!showArtists} onClick={() => setShowArtists(false)}>
            Events
          </Button>
          <Button selected={showArtists} onClick={() => setShowArtists(true)}>
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
