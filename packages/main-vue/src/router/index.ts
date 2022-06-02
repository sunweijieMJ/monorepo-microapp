import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { i18n } from '@/plugin';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: i18n.global.t('BaseRouter.t1'),
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: i18n.global.t('BaseRouter.t2'),
    },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
