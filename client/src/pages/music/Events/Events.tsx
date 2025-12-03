import { useEffect, useState } from "react";

import type { EventWithArtists } from "@/types/events/Event";
import EventsList from "./components/EventsList";

const Events = () => {
  const [events, setEvents] = useState<EventWithArtists[]>([]);
  useEffect(() => {
    const getEvents = async () => {
      const res = await fetch("api/music/events");
      const data = await res.json();
      setEvents(data);
    };

    getEvents();
  }, []);

  return <EventsList events={events} />;
};

export default Events;
