import type { Song } from "./Song";

export interface Year {
  year: number;
  comment: string;
  dateCreated: string;
  dateUpdated?: string;
  songs: Song[];
}
