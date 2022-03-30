import i18next from 'i18next';
import storage from '@/utils/storage';
// 语言包
import enLocale from '@/locale/en.json';
import zhLocale from '@/locale/zh-CN.json';

if (!storage('localstorage').get('i18n')) {
  storage('localstorage').set('i18n', 'zh-CN');
}

const INITIAL_LANGUAGE = storage('localstorage').get('i18n');
const messages = {
  en: {
    translation: enLocale,
  },
  'zh-CN': {
    translation: zhLocale,
  },
};
i18next.init({
  lng: INITIAL_LANGUAGE,
  debug: true,
  resources: messages,
});

export default i18next;
