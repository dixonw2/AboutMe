import { useState } from "react";
import type { EventWithArtists } from "@/types/events/Event";
import { getEventName } from "@/utils/event";
import styles from "./Event.module.css";
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
    <div onClick={handleToggleArtists} className={styles.event}>
      <div className={styles.header}>
        <span className={styles.title}>{getEventName(event)}</span>
        <span className={styles.date}>{convertToDate(event.date)}</span>
      </div>
      <div className={styles.meta}>
        {event.headliner && (
          <span>
            Headliner: <em>{event.headliner}</em>
          </span>
        )}
        <b>({event.venue})</b>
      </div>
      {showArtists && (
        <ol className={styles.artists}>
          {sortedEvents.map((artist) => (
            <li key={artist.id}>{artist.artist}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Event;
