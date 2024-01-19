import axios from "axios";
import { reactive } from "vue";

import type { SongsOutput } from "@/models/SongsOutput";

const songsOutput = await axios.get<SongsOutput>(`${import.meta.env.VITE_API_URL}/get-songs`);

const songs = songsOutput.data.songs;

export const musicStore = reactive({
  songs,
});
