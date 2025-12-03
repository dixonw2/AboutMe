import type { ArtistAtEvent } from "./Artist";

export interface Event {
  id: number;
  eventName: string | null;
  headliner: string | null;
  date: string;
  venue: string;
}

export interface EventWithArtists extends Event {
  artists: ArtistAtEvent[];
}
