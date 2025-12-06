import type { EventWithArtists } from "@/types/events/Event";
import Event from "./Event";

const EventsList = ({ events }: { events: EventWithArtists[] }) => {
  const sortedEvents = events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return (
    <div>
      {sortedEvents.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
