<script setup lang="ts">
import { onMounted, ref } from "vue";

import { musicControllerStore } from "@/stores/MusicControllerStore";
import ProgressBar from "./ProgressBar.vue";
import VolumeDisplay from "./VolumeDisplay.vue";
import IconPrevious from "./icons/IconPrevious.vue";
import IconNext from "./icons/IconNext.vue";
import IconPlay from "./icons/IconPlay.vue";
import IconPause from "./icons/IconPause.vue";

const audioPlayer = ref<HTMLAudioElement | null>(null);

onMounted(() => {
  if (audioPlayer.value) {
    musicControllerStore.initAudioPlayer(audioPlayer.value);
  }
});
</script>

<template>
  <div class="player-container">
    <h2>Current Song: {{ musicControllerStore.currentSong.title }}</h2>
    <h2>Current Artist: {{ musicControllerStore.currentSong.artist }}</h2>
    <h2>Current Album: {{ musicControllerStore.currentSong.album }}</h2>
    <div class="interface-container">
      <div class="button-container">
        <IconPrevious @click="() => musicControllerStore.playPreviousSong()" />
        <IconPlay
          v-if="!musicControllerStore.isPlaying"
          @click="() => musicControllerStore.togglePlaying()"
        />
        <IconPause v-else @click="() => musicControllerStore.togglePlaying()" />
        <IconNext @click="() => musicControllerStore.playNextSong()" />
        <VolumeDisplay />
      </div>
      <audio ref="audioPlayer" preload="auto">
        <source
          :key="musicControllerStore.currentSong.id"
          :src="musicControllerStore.currentSong.url"
          type="audio/ogg"
        />
      </audio>
      <div class="time-container">
        <span
          >{{ Math.floor(musicControllerStore.currentTime / 60) }}:{{
            Math.floor(musicControllerStore.currentTime % 60)
              .toString()
              .padStart(2, "0")
          }}
          / {{ Math.floor(musicControllerStore.currentSong.duration / 60) }}:{{
            Math.floor(musicControllerStore.currentSong.duration % 60)
              .toString()
              .padStart(2, "0")
          }}</span
        >
      </div>
      <ProgressBar
        @click="
          (event: any) =>
            musicControllerStore.seekTo(
              (event.offsetX /
                (event.target.classList.contains('bar') ? event.target : event.target.parentElement)
                  .clientWidth) *
                musicControllerStore.currentSong.duration
            )
        "
        :progressPercentage="
          Math.floor(
            (musicControllerStore.currentTime / musicControllerStore.currentSong.duration) * 100
          )
        "
      />
    </div>
  </div>
</template>

<style scoped>
.player-container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  color: white;
}

.interface-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    * {
      margin: 0 1rem;
      flex-grow: 1;
    }
  }
}


</style>
