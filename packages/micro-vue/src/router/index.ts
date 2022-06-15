import { RouteRecordRaw } from 'vue-router';
import HomePage1 from '../views/HomePage1.vue';
import HomePage2 from '../views/HomePage2.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/HomePage1',
    name: 'HomePage1',
    component: HomePage1,
    meta: {
      title: 'HomePage1',
    },
  },
  {
    path: '/HomePage2',
    name: 'HomePage2',
    component: HomePage2,
    meta: {
      title: 'HomePage2',
    },
  },
];

export default routes;
