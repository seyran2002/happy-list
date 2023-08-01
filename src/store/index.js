import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import lang from './modules/lang';
import profile from './modules/profile';

import home from './modules/home';
import event from './modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    lang,
    home,
    event,
    profile,
  },
});
