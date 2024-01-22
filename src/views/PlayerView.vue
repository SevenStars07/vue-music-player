<script setup lang="ts">
import { musicStore } from "@/stores/MusicStore";
import SongDisplay from "@/components/SongDisplay.vue";
import SongTitleDetail from "@/components/SongTitleDetail.vue";
</script>

<template>
  <div class="songs-container">
    <div class="songs-header">
      <SongTitleDetail sortKey="title" />
      <SongTitleDetail sortKey="artist" />
      <SongTitleDetail sortKey="duration" />
      <SongTitleDetail sortKey="album" />
    </div>
    <div class="songs">
      <SongDisplay v-for="song in musicStore.songs" :song="song" :key="song.id" />
    </div>
  </div>
</template>

<style scoped>
.songs-container {
  height: 40rem;
  display: flex;
  flex-direction: column;
}

.songs {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  scrollbar-width: thin;
  scrollbar-color: #ffffff transparent;

  &::-webkit-scrollbar {
    width: 8px;
    padding: 0 0.125rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: #ffffff;
  }
}

.songs-header {
  padding: 0.5rem;
  border-bottom: 1px solid white;

  display: flex;
  justify-content: space-around;
}

.song-detail {
  width: 25%;
  cursor: pointer;
  user-select: none;
}

.song-detail:hover {
  color: #ffffff;
}
</style>
