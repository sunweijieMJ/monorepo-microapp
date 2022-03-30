import i18n from './i18n';
import storage from '@/utils/storage';

// 探测是否支持webp
const judgeUseWebp = () => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    try {
      const isWebp = canvas
        .toDataURL('image/webp')
        .includes('data:image/webp')
        .toString();

      storage('localstorage').set('isWebp', isWebp);
    } catch (e) {
      console.error(e);
    }
  }
};

export { i18n, judgeUseWebp };
