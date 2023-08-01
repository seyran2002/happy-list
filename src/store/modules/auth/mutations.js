import { setStorageItem, removeStorageItem } from '@/helpers/storage';
import mutationTypes from '../../types/mutation-types';

const mutations = {
  [mutationTypes.SET_USER_DATA](state, payload) {
    setStorageItem('userData', payload);
    state.userData = payload;
  },

  [mutationTypes.CHANGE_USER_DATA_ITEM](state, payload) {
    state.userData[payload.key] = payload.value;
  },

  [mutationTypes.SET_TOKEN](state, payload) {
    setStorageItem('token', payload);
    state.token = payload;
  },

  [mutationTypes.LOGOUT_USER](state) {
    removeStorageItem('userData');
    state.userData = null;
  },

  [mutationTypes.REMOVE_TOKEN](state) {
    removeStorageItem('token');
    state.token = null;
  },

  [mutationTypes.SET_PASSWORD_INSTRUCTION](state, payload) {
    state.passwordInstruction = payload;
  },

  [mutationTypes.SET_REDIRECT_URL](state, payload) {
    state.redirectAfterAuth = payload;
  },
};

export default {
  mutations,
};
