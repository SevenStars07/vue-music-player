<script setup lang="ts">
defineProps<{
  onClick: (event: MouseEvent) => void;
  progressPercentage: number;
}>();
</script>

<template>
  <div class="bar" @click="onClick">
    <div class="filled-bar" :style="`width: ${progressPercentage}%`"></div>
  </div>
</template>


<style scoped>

.bar {
  width: 80%;
  height: 10px;
  background-color: white;
  border-radius: 50px;
}

.filled-bar {
  height: 100%;
  background-color: #1db954;
  border-radius: 50px;
}

</style>