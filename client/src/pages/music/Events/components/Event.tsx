import { useState } from "react";
import type { EventWithArtists } from "@/types/events/Event";
import { getEventName } from "@/utils/event";
import styles from "../Events.module.css";
import { convertToDate } from "@/utils/date-time";

const Event = ({ event }: { event: EventWithArtists }) => {
  const [showArtists, setShowArtists] = useState(false);

  const sortedEvents = [...event.artists].sort(
    (a, b) => a.setOrder - b.setOrder
  );

  const handleToggleArtists = () => {
    setShowArtists((showArtists) => !showArtists);
  };

  return (
    <div onClick={handleToggleArtists} className={styles["event-container"]}>
      <h2>
        <span>{getEventName(event)}</span>
        <span className={styles["date"]}>{convertToDate(event.date)}</span>
      </h2>
      <p>
        {event.headliner && (
          <span>
            Headliner: <em>{event.headliner}</em>
          </span>
        )}
        <b>{event.venue}</b>
      </p>
      {showArtists && (
        <ul>
          {sortedEvents.map((artist, i) => (
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
