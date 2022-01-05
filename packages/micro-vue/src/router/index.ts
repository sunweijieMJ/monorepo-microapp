import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/HomePage',
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage,
  },
];

export default routes;
