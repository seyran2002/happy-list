import profile from '@/api/profile';
import mutationTypes from '../../types/mutation-types';
import actionTypes from '../../types/action-types';

const actions = {
  [actionTypes.CHANGE_LANG]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = { localization: payload.lang };
      profile
        .editProfileInfo(data)
        .then(response => {
          commit(mutationTypes.SET_LANG, payload);
          resolve(!!response.data.data[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.UPDATE_LANG]({ commit }, payload) {
    commit(mutationTypes.SET_LANG, payload);
  },
};

export default {
  actions,
};
