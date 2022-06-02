import { createI18n } from 'vue-i18n';
// 语言包
import enElement from 'element-plus/lib/locale/lang/en';
import zhElement from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from '@/locale/en.json';
import zhLocale from '@/locale/zh-CN.json';

import storage from '@/utils/storage';

if (!storage('localstorage').get('i18n')) {
  storage('localstorage').set('i18n', 'zh-CN');
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
  locale: storage('localstorage').get('i18n'),
  fallbackLocale: zhElement.name,
  messages,
});

export default i18n;
