import Vue from 'vue';
import VueRouter from 'vue-router';
import Generator from '../views/Generator.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Generator',
    component: Generator
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
