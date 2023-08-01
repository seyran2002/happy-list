<template>
  <div class="authentication">
    <div v-if="isLoginOrRegistration" class="authentication-tabs">
      <button
        v-for="{ name, title } in tabs"
        :key="name"
        class="authentication-tabs-btn"
        :class="{ active: authComponent === name }"
        @click="selectComponent(name)"
      >
        {{ $t(title) }}
      </button>
    </div>

    <div class="authentication-tab">
      <component
        :is="authComponent"
        @select-component="selectComponent"
        @show-forgot-password="selectComponent('ForgotPassword')"
      />
    </div>
  </div>
</template>

<script>
import Login from './OrganismLogin';

export default {
  name: 'OrganismAuthentication',
  components: {
    Login,
    Registration: () => import('./OrganismRegistration'),
    ForgotPassword: () => import('./OrganismForgotPassword'),
  },
  props: {
    loginOrRegistration: {
      type: String,
      default: 'Login',
    },
  },
  data: () => ({
    authComponent: 'Login',
    tabs: [
      {
        name: 'Login',
        title: 'header.login',
      },
      {
        name: 'Registration',
        title: 'header.register',
      },
    ],
  }),
  watch: {
    loginOrRegistration: {
      handler(value) {
        this.authComponent = value;
      },
      immediate: true,
    },
  },
  computed: {
    isLoginOrRegistration() {
      return this.tabs.map(tab => tab.name).includes(this.authComponent);
    },
  },
  methods: {
    selectComponent(name) {
      this.authComponent = name;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismAuthentication.scss';
</style>
