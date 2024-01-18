import { createRouter, createWebHistory } from 'vue-router'
import PlayerView from '../views/PlayerView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'player',
      component: PlayerView
    },
    {
      path: '/Settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router
