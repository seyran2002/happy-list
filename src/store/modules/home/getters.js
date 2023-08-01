import getterTypes from '../../types/getter-types';

const getters = {
  [getterTypes.GET_COUNTS]: state => state.counts,
};
export default {
  getters,
};
