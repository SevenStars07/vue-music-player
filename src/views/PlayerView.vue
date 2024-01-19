<script setup lang="ts">
import NowPlaying from "@/components/NowPlaying.vue";
import { musicStore } from "@/stores/MusicStore";
import SongDisplay from "@/components/SongDisplay.vue";
</script>

<template>
  <div>
    <h1>Songs</h1>
    <div class="songs-container">
        <div class="song">
          <div class="song-detail">Title</div>
          <div class="song-detail">Artist</div>
          <div class="song-detail">Duration</div>
          <div class="song-detail">Album</div>
        </div>
      <SongDisplay v-for="song in musicStore.songs" :song="song" :key="song.id" />
    </div>
    <NowPlaying />
  </div>
</template>

<style scoped>
.songs-container {
  display: flex;
  flex-direction: column;
}
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
