<script setup lang="ts">
import ProgressBar from "./ProgressBar.vue";
import { musicControllerStore } from "@/stores/MusicControllerStore";
import IconVolume from "./icons/IconVolume.vue";
import IconVolumeMuted from "./icons/IconVolumeMuted.vue";
</script>

<template>
  <div class="volume">
    <IconVolumeMuted
      v-if="musicControllerStore.isMuted"
      :onClick="() => musicControllerStore.toggleMuted()"
    />
    <IconVolume
      v-else
      :onClick="() => musicControllerStore.toggleMuted()"
    />
    <ProgressBar
      :onClick="
        (event: any) => {
          musicControllerStore.setVolume(
            event.offsetX /
              (event.target.classList.contains('bar') ? event.target : event.target.parentElement)
                .clientWidth
          );
        }
      "
      :progressPercentage="musicControllerStore.isMuted ? 0 : musicControllerStore.volume * 100"
    />
  </div>
</template>

<style scoped>
.volume {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
