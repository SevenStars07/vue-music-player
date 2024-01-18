<script setup lang="ts">
import NowPlaying from '@/components/NowPlaying.vue'

import { musicStore } from '@/stores/MusicStore';


</script>

<template>
 <div>
  <h1>Songs</h1>
  <ul>
   <li v-for="song in musicStore.songs" :key="song.id" :style="{color: (song.id === musicStore.currentSong.id ? 'red': 'white')}">
    {{ song.title }}
   </li>
  </ul>
 </div>
 <NowPlaying />
</template>

<style scoped>

</style>
