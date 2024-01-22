<script setup lang="ts">
import type { Song } from "@/models/SongsOutput";
import SortSymbol from "@/components/SortSymbol.vue";
import { musicStore } from "@/stores/MusicStore";

defineProps<{
  sortKey: keyof Song;
}>();
</script>

<template>
  <div class="song-header" @click="musicStore.sortSongs(sortKey)">
    {{ sortKey.toUpperCase() }}
    <SortSymbol :sortKey="sortKey" />
  </div>
</template>

<style scoped>
.song-header {
  width: 25%;
  cursor: pointer;
  user-select: none;
}

.song-header:hover {
  color: white;
  .sort-symbol {
    opacity: 1;
  }
}
</style>
