import NProgress from 'nprogress';
import router from './index';
import storage from '@/utils/storage';

NProgress.configure({ showSpinner: false });
// 白名单
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start();

  const token =
    storage('sessionStorage').get('token') ||
    storage('localStorage').get('token');
  // 判断是否登录
  if (token) {
    if (whiteList.includes(to.path)) {
      next({ name: 'Layout' });
      NProgress.done();
    } else {
      next();
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next({ name: 'Login' });
    NProgress.done();
  }
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
