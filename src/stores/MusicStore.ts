import axios from "axios";
import { reactive } from "vue";

import type { Song, SongsOutput } from "@/models/SongsOutput";

const songsOutput = await axios.get<SongsOutput>(`${import.meta.env.VITE_API_URL}/get-songs`);

const songs = songsOutput.data.songs;

export const musicStore = reactive({
  songs,

  sortSongs(sortBy: keyof Song, sortDirection: "asc" | "desc") {
    this.songs.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (a[sortBy] > b[sortBy]) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });
  },
});
