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
    <div class="current-song-container">
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/602f4731226337.5646928c3633f.jpg"
      />
      <div class="song-details">
        <span>{{ musicControllerStore.currentSong.title }}</span>
        <span>{{ musicControllerStore.currentSong.artist }}</span>
      </div>
    </div>
    <div class="interface-container">
      <div class="button-container">
        <IconPrevious @click="() => musicControllerStore.playPreviousSong()" />
        <IconPlay
          v-if="!musicControllerStore.isPlaying"
          @click="() => musicControllerStore.togglePlaying()"
        />
        <IconPause v-else @click="() => musicControllerStore.togglePlaying()" />
        <IconNext @click="() => musicControllerStore.playNextSong()" />
        <!-- <VolumeDisplay /> -->
      </div>
      <audio ref="audioPlayer">
        <source
          :key="musicControllerStore.currentSong.id"
          :src="musicControllerStore.currentSong.url"
          type="audio/ogg"
        />
      </audio>
      <div class="time-container">
        {{ Math.floor(musicControllerStore.currentTime / 60) }}:{{
          Math.floor(musicControllerStore.currentTime % 60)
            .toString()
            .padStart(2, "0")
        }}
        <ProgressBar
          @click="
            (event: any) =>
              musicControllerStore.seekTo(
                (event.offsetX /
                  (event.target.classList.contains('bar')
                    ? event.target
                    : event.target.parentElement
                  ).clientWidth) *
                  musicControllerStore.currentSong.duration
              )
          "
          :progressPercentage="
            Math.floor(
              (musicControllerStore.currentTime / musicControllerStore.currentSong.duration) * 100
            )
          "
        />
        {{ Math.floor(musicControllerStore.currentSong.duration / 60) }}:{{
          Math.floor(musicControllerStore.currentSong.duration % 60)
            .toString()
            .padStart(2, "0")
        }}
      </div>
    </div>

    <div class="volume-container">
      <VolumeDisplay />
    </div>
  </div>
</template>

<style scoped>
.player-container {
  width: 100%;
  display: flex;
  color: white;

  & > * {
    width: 33%;
  }

  .current-song-container {
    display: flex;

    img {
      display: block;
      height: 85px;
      width: auto;
    }

    .song-details {
      display: flex;
      flex-direction: column;
      justify-content: center;

      width: 100%;

      & > * {
        margin: 0.5rem;
      }
    }
  }

  .interface-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > * {
      width: 100%;
    }

    .button-container {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      & > * {
        margin: 0 1rem;
        flex-grow: 1;
      }
    }

    .time-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .bar {
        margin: 0 1rem;
      }
    }
  }

  .volume-container {
    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
      flex-grow: 1;
    }
  }
}
</style>
