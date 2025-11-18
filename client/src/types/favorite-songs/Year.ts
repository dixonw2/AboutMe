import type Song from "./Song";

export default interface Year {
  year: number;
  comment: string;
  dateCreated: string;
  dateUpdated: string | null;
  songs: Song[];
}
