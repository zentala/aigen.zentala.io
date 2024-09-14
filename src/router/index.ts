import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Gallery from '@/views/Gallery.vue'
import About from '@/views/About.vue'
import ImageDetails from '@/views/ImageDetails.vue'
import Collections from '@/views/Collections.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/image/:id',
    name: 'ImageDetails',
    component: ImageDetails,
  },
  {
    path: '/collections',
    name: 'Collections',
    component: Collections,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router