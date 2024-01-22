<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NowPlaying from "@/components/NowPlaying.vue";
</script>

<template>
  <!-- <nav>
    <RouterLink to="/">Player</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
  </nav> -->
  <main>
    <RouterView class="router-view" />
    <NowPlaying />
  </main>
</template>

<style scoped>
main {
  /* flex-grow: 9; */
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

nav {
  flex-grow: 1;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;

  * {
    padding: 1rem;
    border-radius: 5px;
  }
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-top: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
