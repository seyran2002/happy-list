import getterTypes from '../../types/getter-types';

const getters = {
  [getterTypes.IS_LOGGED_IN]: state => !!(state.userData && state.token),
  [getterTypes.USER_DATA]: state => state.userData,
};

export default {
  getters,
};
