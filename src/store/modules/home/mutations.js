import mutationTypes from '../../types/mutation-types';

const mutations = {
  [mutationTypes.SET_COUNTS](state, payload) {
    state.counts = payload;
  },
};

export default {
  mutations,
};
