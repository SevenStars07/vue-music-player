<script setup lang="ts">
import { musicControllerStore } from "@/stores/MusicControllerStore";
import type { Song } from "@/models/SongsOutput";

defineProps<{
  song: Song;
}>();

</script>

<template>
  <div
    class="song"
    :style="{ color: song.id === musicControllerStore.currentSong.id ? '#1db954' : 'white' }"
    @click="
      () => {
        musicControllerStore.setCurrentSong(song);
        musicControllerStore.seekTo(0);
      }
    "
  >
    <div class="song-detail">
      {{ song.title }}
    </div>
    <div class="song-detail">
      {{ song.artist }}
    </div>
    <div class="song-detail">
      {{ Math.floor(song.duration / 60) }}:{{
            Math.floor(song.duration % 60)
              .toString()
              .padStart(2, "0")
          }}
    </div>
    <div class="song-detail">
      {{ song.album }}
    </div>
  </div>
</template>

<style scoped>
.song {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid white;

  display: flex;
  justify-content: space-around;
}

.song-detail {
  width: 25%;
}
</style>
