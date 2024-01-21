<script setup lang="ts">
import NowPlaying from "@/components/NowPlaying.vue";
import { musicStore } from "@/stores/MusicStore";
import SongDisplay from "@/components/SongDisplay.vue";
import { ref } from "vue";
import { type Song } from "@/models/SongsOutput";

const sortKey = ref<keyof Song | "none">("none");
const sortDirection = ref<"asc" | "desc" | "none">("none");

const sortSongs = (key: keyof Song) => {
  sortKey.value = key;
  sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  musicStore.sortSongs(key, sortDirection.value);
};
</script>

<template>
  <div>
    <h1>Songs</h1>
    <div class="songs-container">
      <div class="song">
        <div class="song-detail" @click="sortSongs('title')">
          Title
          <span v-if="sortKey === 'title' && sortDirection === 'asc'"> ^ </span>
          <span v-if="sortKey === 'title' && sortDirection === 'desc'"> v </span>
        </div>
        <div class="song-detail" @click="sortSongs('artist')">
          Artist
          <span v-if="sortKey === 'artist' && sortDirection === 'asc'"> ^ </span>
          <span v-if="sortKey === 'artist' && sortDirection === 'desc'"> v </span>
        </div>
        <div class="song-detail" @click="sortSongs('duration')">
          Duration

          <span v-if="sortKey === 'duration' && sortDirection === 'asc'"> ^ </span>
          <span v-if="sortKey === 'duration' && sortDirection === 'desc'"> v </span>
        </div>
        <div class="song-detail" @click="sortSongs('album')">
          Album
          <span v-if="sortKey === 'album' && sortDirection === 'asc'"> ^ </span>
          <span v-if="sortKey === 'album' && sortDirection === 'desc'"> v </span>
        </div>
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

  height: 32rem;
  overflow-y: scroll;
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
  cursor: pointer;
  user-select: none;
}

.song-detail:hover {
  color: #ffffff;
}
</style>
