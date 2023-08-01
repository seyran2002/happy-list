import homeApi from '../../../api/home';
import mutationTypes from '../../types/mutation-types';
import actionTypes from '../../types/action-types';

const actions = {
  async [actionTypes.GET_COUNTS]({ commit }) {
    const { data } = await homeApi.getCounts();
    commit(mutationTypes.SET_COUNTS, data.data);
  },
};

export default {
  actions,
};
