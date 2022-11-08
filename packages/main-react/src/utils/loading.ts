import { message } from 'antd';

// 请求计数
let requestCount = 0;

/**
 * @description 开启loading
 */
const startLoading = () => {
  message.loading('loading', 0);
};

/**
 * @description 关闭loading
 */
const closeLoading = () => {
  message.destroy();
};

/**
 * @description 关闭loading(合并重复操作)
 */
const tryCloseLoading = () => {
  if (requestCount === 0) {
    closeLoading();
  }
};

/**
 * @description 开启loading(合并重复操作)
 */
const showFullScreenLoading = () => {
  if (requestCount === 0) {
    startLoading();
  }
  requestCount++;
};

/**
 * @description 关闭loading(合并重复操作并设置延迟)
 */
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
