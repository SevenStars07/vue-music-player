<script setup lang="ts">
import { type Song } from "@/models/SongsOutput";

import { musicStore } from "@/stores/MusicStore";

defineProps<{
  sortKey: keyof Song;
}>();
</script>

<template>
  <span
    class="sort-symbol"
    :class="{
      hidden: sortKey !== musicStore.sortKey,
    }"
  >
    {{ musicStore.sortDirection === "desc" ? "v" : "^" }}
  </span>
</template>

<style scoped>
.sort-symbol {
  margin-left: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  padding: 0 0.25rem;
}

.hidden {
  opacity: 0;
}

.sort-symbol:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.2s ease-in-out;
}
</style>
