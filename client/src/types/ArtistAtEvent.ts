import type Artist from "./Artist";

export default interface ArtistAtEvent extends Artist {
  setOrder: number;
}
