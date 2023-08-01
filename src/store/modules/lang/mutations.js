import { setStorageItem } from '@/helpers/storage';
import mutationTypes from '../../types/mutation-types';

const mutations = {
  [mutationTypes.SET_LANG](state, payload) {
    if (!payload.lang) return;
    setStorageItem('lang', payload.lang);
    payload.i18n.locale = payload.lang;
    state.lang = payload.lang;
  },
};

export default {
  mutations,
};
