import type { ArtistAtEvent } from "./Artist";

export interface Event {
  id: number;
  eventName?: string;
  headliner?: string;
  date: string;
  venue: string;
}

export interface EventWithArtists extends Event {
  artists: ArtistAtEvent[];
}
