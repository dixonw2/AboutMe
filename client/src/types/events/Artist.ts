import type { Event } from "./Event";

export interface Artist {
  id: number;
  artist: string;
}

export interface ArtistAtEvent extends Artist {
  setOrder: number;
}

export interface ArtistWithEvents extends Artist {
  events: Event[];
}
