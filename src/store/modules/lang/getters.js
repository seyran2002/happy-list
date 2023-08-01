import getterTypes from '../../types/getter-types';

const getters = {
  [getterTypes.GET_LANGUAGE]: state => state.lang,
};

export default {
  getters,
};
