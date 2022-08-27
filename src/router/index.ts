import {createRouter, createWebHashHistory} from 'vue-router';
import Generator from '@/views/Generator.vue';

const routes = [
  {
    path: '/',
    name: 'Generator',
    component: Generator
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
