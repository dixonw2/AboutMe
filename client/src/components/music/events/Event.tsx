import { useState } from "react";
import type EventArtists from "@/types/EventArtists";
import "./Event.css";

const Event = ({ event }: { event: EventArtists }) => {
  const [showArtists, setShowArtists] = useState(false);

  const getSeason = (date: string) => {
    // zero based
    const month = new Date(date).getMonth() + 1;

    if ([12, 1, 2].includes(month)) return "Winter";
    if ([3, 4, 5].includes(month)) return "Spring";
    if ([6, 7, 8].includes(month)) return "Summer";
    if ([9, 10, 11].includes(month)) return "Fall";
    return "Donde Esta El Montho?";
  };

  const getYear = (date: string) => {
    return new Date(date).getFullYear() % 100;
  };

  const handleToggleArtists = () => {
    setShowArtists((showArtists) => !showArtists);
  };

  const eventName =
    event.eventName ||
    `${event.headliner} ${getSeason(event.date)} '${getYear(event.date)}`;
  // force timezone to have accurate date
  const eventDate = new Date(`${event.date}T00:00:00`).toLocaleDateString();

  return (
    <div onClick={handleToggleArtists} className="event-container">
      <h2>
        <span>{eventName}</span>
        <span className="date">{eventDate}</span>
      </h2>
      <p>
        <span>
          {event.headliner && (
            <span>
              Headliner: <em>{event.headliner}</em>
            </span>
          )}
        </span>
        <span>
          <b>{event.venue}</b>
        </span>
      </p>
      {showArtists && (
        <ul>
          {event.artists
            .sort((a, b) => a.setOrder - b.setOrder)
            .map((artist, i) => (
              <li key={artist.id}>
                {i + 1}. {artist.artist}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Event;
