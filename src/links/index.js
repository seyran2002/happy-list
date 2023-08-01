const ANNIVERSARY_EVENTS = 'events';
const SANTA_EVENTS = 'santa-events';
const GUESTS = 'guests';
const PRESENTS = 'presents';

const ANNIVERSARY = {
  CURRENT_EVENTS: `${ANNIVERSARY_EVENTS}?search=saved:0`,
  MY_EVENTS: `${ANNIVERSARY_EVENTS}?search=saved:1&orderBy=datetime&sortedBy=desc`,
  INVITED_EVENTS: `${GUESTS}/invited?orderBy=datetime&sortedBy=desc`,
};

const AUTH = {
  USERS_CONFIRM: 'users/confirm',
  OAUTH_TOKEN: 'oauth/token',
  REFRESH_TOKEN: '/auth/token/refresh',
  CALLBACK: 'callback',
  PASSWORD_RESET: 'password/reset',
  USERS_BIND: 'users/bind',
  REGISTER: 'register',
  AUTOLOGIN: 'autologin',
  OAUTH_LOGOUT: 'oauth/logout',
  OAUTH_LOGOUT_ALL: 'oauth/logout/all',
};

const PROFILE = {
  GET_INFO: 'oauth/user',
  EDIT_INFO: 'users/user',
  UPLOAD_IMAGE: 'upload/image/avatars',
  DELETE_FB_USER: 'users/delete-facebook-user',
  CHANGE_PWD: 'users/change-password',
};

const SANTA = {
  CURRENT_EVENTS: `${SANTA_EVENTS}?saved=0`,
  MY_EVENTS: `${SANTA_EVENTS}?orderBy=datetime&sortedBy=desc`,
  GUESTS: 'santa-guests',
};

export { ANNIVERSARY_EVENTS, SANTA_EVENTS, GUESTS, PRESENTS, ANNIVERSARY, SANTA, AUTH, PROFILE };
