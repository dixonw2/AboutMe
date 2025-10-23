import type ArtistAtEvent from "./ArtistAtEvent";
import type Event from "./Event";

export default interface EventArtists extends Event {
  artists: ArtistAtEvent[];
}
