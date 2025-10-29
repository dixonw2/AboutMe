import type EventArtists from "@/types/EventArtists";
import Event from "./Event";

const Events = ({ events }: { events: EventArtists[] }) => {
  const sortedEvents = events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return (
    <div>
      <h1>Events</h1>
      {sortedEvents.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
