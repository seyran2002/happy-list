import axios from '@/api/axios';
import { AUTH, PROFILE } from '@/links';

const facebookLoginWithUsername = payload => axios.post(AUTH.USERS_CONFIRM, payload);

const login = payload => axios.post(AUTH.OAUTH_TOKEN, payload);

const refreshToken = payload => axios.post(AUTH.REFRESH_TOKEN, payload);

const auth = (provider, params) => axios.get(`${AUTH.CALLBACK}/${provider}?${params}`);

const getResetEmail = username => axios.get(AUTH.PASSWORD_RESET, { params: { username } });

const reset = payload => axios.post(AUTH.PASSWORD_RESET, payload);

const merge = payload => axios.post(AUTH.USERS_BIND, payload);

const register = payload => axios.post(AUTH.REGISTER, payload);

const autologin = key => axios.get(`${AUTH.AUTOLOGIN}/${key}`);

const logout = () => axios.get(AUTH.OAUTH_LOGOUT);

const logoutAll = () => axios.get(AUTH.OAUTH_LOGOUT_ALL);

const uploadImage = payload => axios.post(PROFILE.UPLOAD_IMAGE, payload);

export default {
  facebookLoginWithUsername,
  login,
  refreshToken,
  auth,
  autologin,
  getResetEmail,
  merge,
  reset,
  register,
  logout,
  logoutAll,
  uploadImage,
};
