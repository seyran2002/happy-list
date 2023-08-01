import profileApi from '@/api/profile';
import actionTypes from '../../types/action-types';
import mutationTypes from '../../types/mutation-types';
import authApi from '../../../api/auth';

const actions = {
  async [actionTypes.UPLOAD_IMAGE]({ commit }, payload) {
    const { data } = await authApi.uploadImage(payload);
    commit(mutationTypes.CHANGE_USER_DATA_ITEM, {
      key: 'avatar',
      value: data.data[0].url,
    });
  },
  async [actionTypes.EDIT_PROFILE_INFO]({ rootState }) {
    return profileApi
      .editProfileInfo(rootState.auth.userData)
      .then(data => data.data.data)
      .catch(() => false);
  },

  [actionTypes.DELETE_FB_USER]({ commit }) {
    return new Promise((resolve, reject) => {
      profileApi
        .deleteFbUser()
        .then(response => {
          commit(mutationTypes.LOGOUT_USER);
          resolve(!!response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  [actionTypes.CHANGE_PWD](_, payload) {
    return new Promise((resolve, reject) => {
      profileApi
        .changePwd(payload)
        .then(response => {
          resolve(!!response);
        })
        .catch(error => reject(error));
    });
  },
};

export default {
  actions,
};
