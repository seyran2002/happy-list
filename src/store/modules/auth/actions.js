import Vue from 'vue';
import authApi from '@/api/auth';
import profileApi from '@/api/profile';
import i18n from '@/i18n';
import mutationTypes from '../../types/mutation-types';
import actionTypes from '../../types/action-types';

const actions = {
  [actionTypes.REGISTER]({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      authApi
        .register(data)
        .then(response => {
          const updateTokenOnRegister = () => {
            commit(mutationTypes.REMOVE_TOKEN);

            const token = {};
            token.access_token = response.data.access_token;
            token.refresh_token = response.data.refresh_token;

            commit(mutationTypes.SET_TOKEN, token);
            dispatch(actionTypes.GET_MY_PROFILE_INFO)
              .then()
              .catch(err => {
                reject(err);
              });
          };

          if (response.errors) {
            reject(response.errors);
          } else if (localStorage.getItem('event_token')) {
            dispatch(actionTypes.LOGIN, {
              data: {
                username: data.username,
                password: data.password,
                client_secret: process.env.VUE_APP_CLIENT_SECRET,
                client_id: process.env.VUE_APP_CLIENT_ID,
                grant_type: 'password',
              },
              i18n,
            }).then(() => {
              resolve({ redirect: 'MyEvents' });
            });
          } else {
            updateTokenOnRegister();
            resolve();
          }
        })
        .catch(error => {
          reject(error.errors);
        });
    });
  },

  [actionTypes.LOGIN]({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      authApi
        .login(data.data)
        .then(response => {
          if (!response.code && response.error !== 'invalid_credentials') {
            const token = {};
            token.access_token = response.data.access_token;
            token.refresh_token = response.data.refresh_token;

            commit(mutationTypes.SET_TOKEN, token);
            dispatch(actionTypes.GET_MY_PROFILE_INFO, { i18n: data.i18n })
              .then()
              .catch(err => {
                reject(err);
              });

            resolve(!!response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  async [actionTypes.REFRESH_TOKEN]({ commit }, data) {
    return new Promise((resolve, reject) => {
      authApi
        .refreshToken({ headers: data })
        .then(resp => {
          const token = {};
          token.access_token = resp.data.access_token;
          token.refresh_token = resp.data.refresh_token;
          commit(mutationTypes.SET_TOKEN, token);

          resolve();
        })
        .catch(err => {
          commit(mutationTypes.LOGOUT_USER);
          commit(mutationTypes.REMOVE_TOKEN);
          reject(err);
        });
    });
  },
  [actionTypes.AUTHENTICATE]({ commit, dispatch }, provider) {
    return new Promise((resolve, reject) => {
      Vue.$auth
        .authenticate(provider)
        .then(authResponse => {
          const token = {};
          token.access_token = authResponse.data.access_token;
          token.refresh_token = authResponse.data.refresh_token;

          commit(mutationTypes.SET_TOKEN, token);
          dispatch(actionTypes.GET_MY_PROFILE_INFO)
            .then()
            .catch(err => {
              reject(err);
            });
          resolve('Ok');
        })
        .catch(error => {
          if (error?.response?.status === 422 && error?.response?.data?.data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject([error.response.data.data]);
          } else if (error?.errors) {
            reject(error.errors);
          }
        });
    });
  },

  [actionTypes.FACEBOOK_LOGIN_WITH_USERNAME](_, username) {
    return new Promise((resolve, reject) => {
      const payload = { username };
      authApi
        .facebookLoginWithUsername(payload)
        .then(response => {
          if (response.error) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject([response.message]);
          } else if (response.errors) {
            reject(response.errors);
          } else {
            resolve();
          }
        })
        .catch(error => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject([`${error.message} 😕`]);
        });
    });
  },

  [actionTypes.USER_MERGE]({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      authApi
        .merge(data)
        .then(response => {
          if (response.code || response.error === 'invalid_credentials') {
            if (response.code === 6 || response.error === 'invalid_credentials') {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject([response.message]);
            } else if (response.code === 9) {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject(['token expired']);
            }
          } else if (response.error || response.exception) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject([response.message]);
          } else if (response.errors) {
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            reject(response.errors);
          } else {
            commit(mutationTypes.REMOVE_TOKEN);

            const token = {};
            token.access_token = response.data.access_token;
            token.refresh_token = response.data.refresh_token;

            commit(mutationTypes.SET_TOKEN, token);
            dispatch(actionTypes.GET_MY_PROFILE_INFO)
              .then()
              .catch(err => {
                reject(err);
              });

            resolve({ redirect: 'MyEvents' });
          }
        })
        .catch(error => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject([`${error.message} 😕`]);
        });
    });
  },

  [actionTypes.LOGOUT]({ commit }) {
    return new Promise((resolve, reject) => {
      authApi.logout().then(response => {
        if (response.errors) {
          reject(response.errors);
        } else {
          commit(mutationTypes.LOGOUT_USER);
          commit(mutationTypes.REMOVE_TOKEN);

          resolve();
        }
      });
    });
  },

  [actionTypes.LOGOUT_ALL]({ commit }) {
    return new Promise((resolve, reject) => {
      authApi.logoutAll().then(response => {
        if (response.errors) {
          reject(response.errors);
        } else {
          commit(mutationTypes.LOGOUT_USER);
          commit(mutationTypes.REMOVE_TOKEN);

          resolve();
        }
      });
    });
  },

  [actionTypes.GET_MY_PROFILE_INFO]({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      profileApi.getProfileInfo().then(response => {
        if (response.errors) {
          reject(response.errors);
        } else {
          if (data && data.i18n) {
            dispatch(actionTypes.UPDATE_LANG, { lang: response.data.data.localization, i18n: data.i18n });
          }

          commit(mutationTypes.SET_USER_DATA, response.data.data);
          resolve();
        }
      });
    });
  },

  [actionTypes.GET_RESET_EMAIL]({ commit }, username) {
    return new Promise((resolve, reject) => {
      commit(mutationTypes.SET_PASSWORD_INSTRUCTION, false);

      authApi
        .getResetEmail(username)
        .then(response => {
          if (response.errors || response.exception) {
            reject(response.errors);
          } else {
            commit(mutationTypes.SET_PASSWORD_INSTRUCTION, true);
            resolve(i18n.t('auth.sentPasswordResetLinkSuccess'));
          }
        })
        .catch(error => reject(error.errors));
    });
  },

  [actionTypes.POST_RESET_EMAIL](_, payload) {
    return new Promise((resolve, reject) => {
      authApi
        .reset(payload)
        .then(response => {
          resolve(!!response);
        })
        .catch(error => reject(error));
    });
  },

  [actionTypes.SET_AUTH_MODAL_VISIBILITY]({ commit }, payload) {
    commit(mutationTypes.TOGGLE_AUTH_MODAL, payload);
  },
};

export default {
  actions,
};
