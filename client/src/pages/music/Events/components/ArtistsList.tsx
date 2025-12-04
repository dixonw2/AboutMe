import type { ArtistWithEvents } from "@/types/events/Artist";
import Artist from "./Artist";
import { useState } from "react";
import { getEventName } from "@/utils/event";

const ArtistsList = ({ artists }: { artists: ArtistWithEvents[] }) => {
  const [filter, setFilter] = useState("");

  const stripArticles = (artist: string) => {
    return artist.replace(/^(the|a|an)\s+/i, "").replace(/^[^a-z0-9]+/i, "");
  };
  const filterList = (artist: ArtistWithEvents) => {
    const search = filter.toLowerCase();
    const matchesArtist = artist.artist.toLowerCase().includes(search);
    const matchesEventName = artist.events.some((event) =>
      getEventName(event).toLowerCase().includes(search)
    );
    const matchesVenue = artist.events.some((event) =>
      event.venue.toLowerCase().includes(search)
    );
    const matchesYear = artist.events.some((event) =>
      event.date.includes(search)
    );

    return matchesArtist || matchesEventName || matchesVenue || matchesYear;
  };
  const sortedArtists = artists.sort((a, b) =>
    stripArticles(a.artist).localeCompare(stripArticles(b.artist))
  );
  const filteredSortedArtists = sortedArtists.filter((artist) =>
    filterList(artist)
  );

  return (
    <div>
      <h1>Artists</h1>
      <input
        placeholder="Search..."
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      {filteredSortedArtists.map((artist) => (
        <Artist key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistsList;
