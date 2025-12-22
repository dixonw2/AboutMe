import type { Song } from "./Song";

export interface Album {
  id?: number;
  albumName: string;
  artist: string;
  genre: string;
  review: string;
  rating: number;
  appleMusicLink: string;
  spotifyLink: string;
  releaseDate: string;
  albumArtPath: string;
  dateCreated: string;
  songs: Song[];
}
