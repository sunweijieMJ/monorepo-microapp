import enUS from '../locale/en-US.json';
import zhCN from '../locale/zh-CN.json';

enum LocalList {
  'zh-CN',
  'en-US',
}
type LocalKey = keyof typeof LocalList;
type ILocale = {
  locale: LocalKey;
  messages: Record<LocalKey, Record<string, string>>;
};

const Locale: ILocale = {
  locale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
};

export default Locale;
