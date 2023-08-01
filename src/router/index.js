import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import VueScrollTo from 'vue-scrollto';
import { getStorageItem } from '@/helpers/storage';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home');
const NotFound = () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound');
const MyEvents = () => import(/* webpackChunkName: "my-events" */ '@/views/MyEvents');

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/faq/:tag?',
    name: 'Faq',
    component: () => import(/* webpackChunkName: "faq" */ '@/views/Faq'),
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: () => import(/* webpackChunkName: "create-event" */ '@/views/CreateEvent'),
  },
  {
    path: '/create-event/:eventType',
    name: 'NewEvent',
    meta: {
      requiresAuth: true,
      hideFooter: true,
    },
    component: () => import(/* webpackChunkName: "new-event" */ '@/views/NewEvent'),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "privacy" */ '@/views/PrivacyPolicy'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      requiresAuth: true,
      hideFooter: true,
    },
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile'),
  },
  {
    path: '/resetPassword/:key',
    name: 'ResetPassword',
    meta: { requiresVisitor: true },
    component: () => import(/* webpackChunkName: "reset-password" */ '@/views/ResetPassword'),
  },
  {
    path: '/accept/:key/:username',
    name: 'FirstInvitation',
    meta: { requiresVisitor: true },
    component: () => import(/* webpackChunkName: "first-invitation" */ '@/views/FirstInvitation'),
  },
  {
    path: '/events',
    meta: { requiresAuth: true },
    component: MyEvents,
    children: [
      {
        path: '',
        name: 'MyEvents',
        component: () => import(/* webpackChunkName: "events-all" */ '@/views/events-children/EventsAll'),
      },
      {
        path: 'secret-santa',
        name: 'EventsSecretSanta',
        component: () =>
          import(/* webpackChunkName: "events-secret-santa" */ '@/views/events-children/EventsSecretSanta'),
        children: [
          {
            path: ':id',
            name: 'EventSecretSanta',
            component: () =>
              import(/* webpackChunkName: "event-secret-santa" */ '@/views/events-children/EventSecretSanta'),
          },
        ],
      },
      {
        path: 'anniversary',
        name: 'EventsAnniversary',
        component: () =>
          import(/* webpackChunkName: "events-anniversary" */ '@/views/events-children/EventsAnniversary'),
        children: [
          {
            path: ':id',
            name: 'EventAnniversary',
            component: () => import(/* webpackChunkName: "event-invited" */ '@/views/events-children/EventAnniversary'),
          },
        ],
      },
      {
        path: 'invited',
        name: 'EventsInvited',
        component: () => import(/* webpackChunkName: "events-invited" */ '@/views/events-children/EventsInvited'),
        children: [
          {
            path: ':id',
            name: 'EventInvited',
            component: () => import(/* webpackChunkName: "event-invited" */ '@/views/events-children/EventInvited'),
          },
        ],
      },
    ],
  },
  {
    path: '/events/join/:eventToken',
    name: 'FirstInvitation',
    meta: { requiresJoin: true },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

// propagate metadata recursively to child routes
// eslint-disable-next-line no-shadow
const propagateMetadata = (routes, meta) => {
  routes.forEach(route => {
    if (route.meta === undefined) {
      route.meta = meta;
    }
    if (route.children !== undefined) {
      propagateMetadata(route.children, route.meta);
    }
  });
};

propagateMetadata(routes, {});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (to.name === 'Faq') {
      const { tag } = to.params;
      const prevTag = from.params.tag;

      if (tag) {
        setTimeout(() => {
          VueScrollTo.scrollTo(`#${tag}`, 1000, { offset: -120 });
        }, 300);
        return { selector: `#${tag}` };
      }

      if (prevTag) {
        VueScrollTo.scrollTo(`#${prevTag}`, 1000, { offset: -100 });
        return { selector: `#${prevTag}` };
      }
    }
  },
});

router.beforeEach((to, from, next) => {
  const token = getStorageItem('token');
  if (to.name === 'NewEvent' && (to.params.eventType === 'secret-santa' || to.params.eventType === 'anniversary')) {
    document.body.classList.add('background-edit-event-page');
  } else {
    document.body.classList.remove('background-edit-event-page');
  }
  if (to.name === 'Profile') {
    const scriptMap = document.createElement('script');
    scriptMap.setAttribute('type', 'text/javascript');
    scriptMap.setAttribute(
      'src',
      `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_KEY}&libraries=places&callback=initMap`
    );
    document.head.appendChild(scriptMap);
    document.body.classList.add('background-edit-profile-page');
  } else {
    document.body.classList.remove('background-edit-profile-page');
  }
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      if (from.name) {
        next(false);
      } else {
        // TODO if it is any problem with redirect look at this
        next({ name: 'Home' });
      }
      next(false);
    }
  } else if (to.meta.requiresVisitor) {
    if (token) {
      if (from.name) {
        next(false);
      } else if (to.name === 'FirstInvitation') {
        next(false);
      } else if (to.name !== 'MyEvents') {
        next({ name: 'MyEvents' });
      }
    } else {
      next();
    }
  } else if (to.meta.requiresJoin) {
    localStorage.setItem('event_token', to.params.eventToken);
    if (token) {
      next({ name: 'MyEvents' });
    } else {
      next({ name: 'FirstInvitation' });
    }
  }
  next();
});

export default router;
