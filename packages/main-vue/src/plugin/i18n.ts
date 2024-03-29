// 语言包
import enElement from 'element-plus/lib/locale/lang/en';
import zhElement from 'element-plus/lib/locale/lang/zh-cn';
import { createI18n } from 'vue-i18n';
import enLocale from '@/locale/en-US.json';
import zhLocale from '@/locale/zh-CN.json';
import storage from '@/utils/storage';

if (!storage('localStorage').get('i18n')) {
  storage('localStorage').set('i18n', 'zh-CN');
}

const messages = {
  en: {
    name: 'en',
    el: enElement.el,
    ...enLocale,
  },
  'zh-CN': {
    name: 'zh-CN',
    el: zhElement.el,
    ...zhLocale,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: storage('localStorage').get('i18n'),
  fallbackLocale: zhElement.name,
  messages,
});

export default i18n;
