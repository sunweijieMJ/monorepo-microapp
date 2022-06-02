import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

// loading实例
let loadingInstance: LoadingInstance;
// 请求计数
let requestCount = 0;

const startLoading = (targetDom?: string) => {
  if (loadingInstance?.visible) return;

  loadingInstance = ElLoading.service({
    fullscreen: !targetDom,
    target: targetDom,
    background: 'rgba(255, 255, 255, 0.85)',
    spinner: 'custom-spinner',
    customClass: 'custom-loading',
  });
};

const closeLoading = () => {
  if (!loadingInstance?.visible) return;

  loadingInstance.close();
};

const tryCloseLoading = () => {
  if (requestCount === 0) {
    closeLoading();
  }
};
const showFullScreenLoading = (targetDom?: string) => {
  if (requestCount === 0) {
    startLoading(targetDom);
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
