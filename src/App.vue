<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Player</RouterLink >
    <RouterLink to="/settings">Settings</RouterLink>
  </nav>
  <RouterView class="router-view" />
</template>

<style scoped>
.router-view {
  flex-grow: 9;
}

nav {
  flex-grow: 1;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
}

nav a.router-link-exact-active {
  color: var(--color-text);
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
