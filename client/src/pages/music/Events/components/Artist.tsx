import type { ArtistWithEvents } from "@/types/events/Artist";
import { convertToDate } from "@/utils/date-time";
import { getEventName } from "@/utils/event";
import { useState } from "react";

import styles from "../Events.module.css";

const Artist = ({ artist }: { artist: ArtistWithEvents }) => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <div
      className={styles["artist-container"]}
      onClick={() => setShowEvents((event) => !event)}
    >
      <h2>
        {artist.artist} ({artist.events.length})
      </h2>
      {showEvents && (
        <div>
          <ol>
            {artist.events.map((event) => (
              <li key={event.id}>
                {getEventName(event)} ({convertToDate(event.date)})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Artist;
