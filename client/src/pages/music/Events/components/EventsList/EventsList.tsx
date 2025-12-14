import { useState } from "react";
import Event from "../Event/Event";
import type { EventWithArtists } from "@/types/events/Event";

import { getEventName } from "@/utils/event";
import { convertToDate } from "@/utils/date-time";

const EventsList = ({ events }: { events: EventWithArtists[] }) => {
  const [filter, setFilter] = useState("");

  const filterList = (event: EventWithArtists) => {
    const search = filter.toLowerCase();
    const matchesArtist = event.artists.some((artist) =>
      artist.artist.toLowerCase().includes(search)
    );
    const matchesEventName = getEventName(event).toLowerCase().includes(search);
    const matchesYear = event.date.toLowerCase().includes(search);
    const matchesVenue = event.venue.toLowerCase().includes(search);
    const matchesHeadliner = event.headliner?.toLowerCase().includes(search);
    const matchesMonth = new Date(convertToDate(event.date))
      .toLocaleString("default", {
        month: "long",
      })
      .toLowerCase()
      .includes(search);

    return (
      matchesArtist ||
      matchesEventName ||
      matchesYear ||
      matchesVenue ||
      matchesHeadliner ||
      matchesMonth
    );
  };

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(convertToDate(a.date)).getTime() -
      new Date(convertToDate(b.date)).getTime()
  );
  const filteredSortedEvents = sortedEvents.filter(filterList);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
      />
      {filteredSortedEvents.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
