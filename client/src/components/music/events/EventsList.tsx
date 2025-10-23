import type EventArtists from "@/types/EventArtists";
import Event from "./Event";

const Events = ({ events }: { events: EventArtists[] }) => {


  return (
    <div>
      <h1>Events</h1>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
