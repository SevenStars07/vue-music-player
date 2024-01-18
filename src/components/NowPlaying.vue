<script setup lang="ts">
import { onMounted, ref, type VNodeRef } from "vue";

//@ts-ignore
import { musicStore } from "@/stores/MusicStore";

const currentTime = ref(0);

const audioPlayer = ref<VNodeRef | null>(null);

const playPreviousSong = () => {
  if (audioPlayer.value?.currentTime > 3) {
    audioPlayer.value.currentTime = 0;
    return;
  }

  const previousSongIndex =
    musicStore.songs.findIndex((song) => song.id === musicStore.currentSong.id) - 1;

  musicStore.setCurrentSong(
    musicStore.songs[(previousSongIndex + musicStore.songs.length) % musicStore.songs.length]
  );

  audioPlayer.value?.load();
  audioPlayer.value?.play();
};

const playNextSong = () => {
  const nextSongIndex =
    musicStore.songs.findIndex((song) => song.id === musicStore.currentSong.id) + 1;

  musicStore.setCurrentSong(musicStore.songs[nextSongIndex % musicStore.songs.length]);

  audioPlayer.value?.load();
  audioPlayer.value?.play();
};

const togglePlayPause = () => {
  if (audioPlayer.value?.paused) {
    audioPlayer.value?.play();
    return;
  }

  audioPlayer.value?.pause();
};

onMounted(() => {
  audioPlayer.value.volume = 0.1;
  audioPlayer.value?.addEventListener("ended", playNextSong);

  const currentTimeInterval = setInterval(() => {
    currentTime.value = audioPlayer.value?.currentTime || 0;
  }, 100);

  return () => {
    clearInterval(currentTimeInterval);
  };
});
</script>

<template>
  <div class="player-container">
    <h2>Current Song: {{ musicStore.currentSong.title }}</h2>
    <h2>Current Artist: {{ musicStore.currentSong.artist }}</h2>
    <h2>Current Album: {{ musicStore.currentSong.album }}</h2>
    <div class="interface-container">
      <div class="button-container">
        <button @click="playPreviousSong">Previous Song</button>
        <button @click="togglePlayPause">Play/Pause</button>
        <button @click="playNextSong">Next Song</button>
      </div>
      <audio ref="audioPlayer">
        <source
          :key="musicStore.currentSong.id"
          :src="musicStore.currentSong.url"
          type="audio/ogg"
        />
      </audio>
      <div
        class="bar"
        v-if="audioPlayer"
        @click="
          (event: any) =>
            (audioPlayer.currentTime =
              (event.offsetX /
                (event.target.classList.contains('bar') ? event.target : event.target.parentElement)
                  .clientWidth) *
              audioPlayer.duration)
        "
      >
        <div
          class="filled-bar"
          :style="`width: ${Math.floor((currentTime / musicStore.currentSong.duration) * 100)}%`"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player-container {
  width: 100%;
  height: 100%;
  background-color: #000;

  display: flex;
  flex-direction: column;
}

.interface-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.bar {
  width: 80%;
  height: 10px;
  background-color: white;
  border-radius: 50px;
}

.filled-bar {
  height: 100%;
  background-color: red;
  border-radius: 50px;
}
</style>
