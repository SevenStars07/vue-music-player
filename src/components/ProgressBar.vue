<script setup lang="ts">
defineProps<{
  onClick: (event: MouseEvent) => void;
  progressPercentage: number;
}>();
</script>

<template>
  <div class="bar" @click="onClick">
    <div class="filled-bar" :style="`width: ${progressPercentage}%`">
      <div class="circle"></div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  width: 80%;
  height: 10px;
  background-color: #535353;
  border-radius: 50px;
  cursor: pointer;
}

.filled-bar {
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 50px;
  position: relative;
}

.circle {
  position: absolute;
  top: -2.5px;
  right: 0px;
  width: 15px;
  height: 15px;
  visibility: hidden;
  border-radius: 50%;
}

.bar:hover {
  .filled-bar {
    background-color: #1db954;
  }

  .circle {
    visibility: visible;
    background-color: white;
  }
}
</style>
