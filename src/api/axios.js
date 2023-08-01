import Vue from 'vue';
import axios from 'axios';
import router from '@/router/index';
import store from '@/store/index';
import { getStorageItem } from '@/helpers/storage';
import mutationTypes from '../store/types/mutation-types';
import actionTypes from '../store/types/action-types';

axios.defaults.baseURL = process.env.VUE_APP_API_PATH;

axios.interceptors.request.use(config => {
  const token = getStorageItem('token');
  const language = getStorageItem('lang');
  if (language && !token) {
    config.headers['X-Localization'] = language;
  }
  config.headers.Authorization = token ? `Bearer ${token.access_token}` : '';
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    const token = getStorageItem('token');
    const originalRequest = error.config;

    if (error.response?.data?.errors) {
      const { errors: responseErrors } = error.response.data;
      Object.keys(responseErrors).forEach(item => {
        responseErrors[item].forEach(err => {
          Vue.prototype.$snotify.error(err);
        });
      });
    }

    if (error.response.status === 401 || error.response.statusText === 'Unauthorized') {
      if (token) {
        originalRequest._retry = true;
        const headers = {
          Accept: 'application/json',
          'x-access-token': token.access_token,
          'x-refresh-token': token.refresh_token,
        };

        return store
          .dispatch(actionTypes.REFRESH_TOKEN, headers)
          .then(() => axios(originalRequest))
          .catch(e => {
            console.log(e);
            router.push('/');
          });
      }
      store.commit(mutationTypes.LOGOUT_USER);
      store.commit(mutationTypes.REMOVE_TOKEN);
      router.push('/');
    }

    return Promise.reject(error.response.data);
  }
);

export default axios;
