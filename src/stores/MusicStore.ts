import axios from "axios";
import { reactive } from "vue";

import type { Song, SongsOutput } from "@/models/SongsOutput";

const songsOutput = await axios.get<SongsOutput>(`${import.meta.env.VITE_API_URL}/get-songs`);

const songs = songsOutput.data.songs;

export type SortDirection = "asc" | "desc";

type MusicStoreInterface = {
  songs: Song[];
  sortKey: keyof Song | "none";
  sortDirection: SortDirection | "none";

  sortSongs(sortBy: keyof Song): void;
};

export const musicStore = reactive<MusicStoreInterface>({
  songs,
  sortKey: "none",
  sortDirection: "none",

  sortSongs(sortBy: keyof Song) {
    // console.log({ sortBy, sortDirection });

    if (this.sortKey === sortBy) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortKey = sortBy;
      this.sortDirection = "asc";
    }

    this.songs.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return this.sortDirection === "asc" ? -1 : 1;
      }

      if (a[sortBy] > b[sortBy]) {
        return this.sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });
  },
});
