// import { Loading } from 'element-ui';

// loading实例
let loadingInstance;
// 请求计数
let requestCount = 0;

const startLoading = () => {
  loadingInstance = Loading.service({
    text: '加载中',
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.3)',
  });
};

const closeLoading = () => {
  loadingInstance.close();
};

const tryCloseLoading = () => {
  if (requestCount === 0) {
    closeLoading();
  }
};
const showFullScreenLoading = () => {
  if (requestCount === 0) {
    startLoading();
  }
  requestCount++;
};

const tryHideFullScreenLoading = () => {
  if (requestCount <= 0) return;
  requestCount--;
  if (requestCount === 0) {
    // 300ms间隔内的loading合并为一次
    setTimeout(tryCloseLoading, 300);
  }
};

export {
  startLoading,
  closeLoading,
  tryCloseLoading,
  showFullScreenLoading,
  tryHideFullScreenLoading,
};
