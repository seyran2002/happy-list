import Vue from 'vue';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import VueAxios from 'vue-axios';
import VueScrollTo from 'vue-scrollto';
import VeeValidate from 'vee-validate';
import VueAuthenticate from 'vue-authenticate';
import axios from 'axios';
import Way2upSeoLib from '@way2up/vue-seo';
import { phoneOrEmailRule, dateFormat, timeFormat } from '@/utils/validators';
import clickOutside from '@/directives/click-outside';
import VCalendar from 'v-calendar';
import App from './App';
import router from './router';
import store from './store';

// scss global
import './assets/styles/global.scss';

import i18n from './i18n';

// Snotify options
const snotifyOptions = {
  toast: {
    position: SnotifyPosition.rightTop,
    icon: false,
  },
};

// plugins

Vue.use(VeeValidate);
Vue.use(Snotify, snotifyOptions);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: process.env.VUE_APP_APIPATH,
  providers: {
    facebook: {
      clientId: Number(process.env.VUE_APP_FACEBOOK_CLIENT_ID),
      redirectUri: `https://${store.state.auth.siteUrl}/callback/facebook`,
    },
    google: {
      clientId: `${process.env.VUE_APP_GOOGLE_CLIENT_ID}`,
      redirectUri: `https://${store.state.auth.siteUrl}/callback/google`,
    },
  },
});
Vue.use(Way2upSeoLib);
Vue.directive('click-outside', clickOutside);

let checkAdd = true;
document.body.onmouseover = function () {
  if (checkAdd) {
    Vue.use(VueScrollTo);
    Vue.use(VCalendar);

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', './tagManager.js');
    document.head.appendChild(scriptTag);

    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.googletagmanager.com/ns.html?id=${process.env.VUE_APP_TAG_MANAGER_ID}`);
    iframe.setAttribute('width', '0');
    iframe.setAttribute('height', '0');
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.head.appendChild(noscript);
  }
  checkAdd = false;
};

document.body.ontouchstart = function () {
  if (checkAdd) {
    Vue.use(VueScrollTo);
    Vue.use(VCalendar);

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', './tagManager.js');
    document.head.appendChild(scriptTag);

    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.googletagmanager.com/ns.html?id=${process.env.VUE_APP_TAG_MANAGER_ID}`);
    iframe.setAttribute('width', '0');
    iframe.setAttribute('height', '0');
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.head.appendChild(noscript);
  }
  checkAdd = false;
};

VeeValidate.Validator.extend('phoneOrEmail', phoneOrEmailRule);
VeeValidate.Validator.extend('dateFormat', dateFormat);
VeeValidate.Validator.extend('time', timeFormat);

Vue.config.productionTip = false;

const eventHub = new Vue();
Vue.prototype.$eventHub = eventHub;

new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
    Vue.$snotify = this.$snotify;
    Vue.$auth = this.$auth;
  },
  render: h => h(App),
}).$mount('#app');
