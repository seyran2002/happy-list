import { getStorageItem, setStorageItem } from '@/helpers/storage';

const initLang = (() => {
  const lang = getStorageItem('lang');

  if (!lang) {
    setStorageItem('lang', 'en');
    return 'en';
  }

  return lang;
})();

export default {
  lang: initLang,
};
