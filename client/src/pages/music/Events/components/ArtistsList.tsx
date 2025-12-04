import type { ArtistWithEvents } from "@/types/events/Artist";
import Artist from "./Artist";

const stripArticles = (artist: string) => {
  return artist.replace(/^(the|a|an)\s+/i, "").replace(/^[^a-z0-9]+/i, "");
};

const ArtistsList = ({ artists }: { artists: ArtistWithEvents[] }) => {
  const sortedArtists = artists.sort((a, b) =>
    stripArticles(a.artist).localeCompare(stripArticles(b.artist))
  );
  return (
    <div>
      <h1>Artists</h1>
      {sortedArtists.map((artist) => (
        <Artist key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistsList;
