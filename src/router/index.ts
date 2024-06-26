import showview from '@/views/Showview.vue'
import changeview from '@/views/Changeview.vue'
import BPview from '@/views/BPview.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'show',
      component: showview,
    },
    {
      path: '/change',
      name: 'change',
      component: changeview,
    },
    {
      path: '/BP',
      name: 'BP',
      component: BPview,
    },
  ]
})

export default router
