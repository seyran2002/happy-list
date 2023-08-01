<template>
  <div class="app">
    <organism-header @show-auth-modal="showAuthModal" />
    <div class="size mt-102 flex-1">
      <router-view />
    </div>
    <organism-footer v-if="!$route.meta.hideFooter && $route.name !== 'Profile'" />

    <organism-modal v-show="isAuthModalShown" class="base-modal" @close="closeAuthModal">
      <template v-slot:body>
        <organism-authentication ref="authentication" />
      </template>
    </organism-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import OrganismHeader from './components/organisms/OrganismHeader';
import OrganismFooter from './components/organisms/OrganismFooter';

export default {
  components: {
    OrganismHeader,
    OrganismFooter,
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismAuthentication: () => import('./components/organisms/OrganismAuthentication'),
  },
  data() {
    return {
      isAuthModalShown: false,
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.IS_LOGGED_IN,
    }),
  },
  created() {
    this.$eventHub.$on('show-modal-auth', this.showAuthModal);
  },
  methods: {
    showAuthModal() {
      this.isAuthModalShown = true;
      document.body.classList.add('modal-open');
    },
    closeAuthModal() {
      this.isAuthModalShown = false;
      document.body.classList.remove('modal-open');

      if (this.$refs.authentication && this.$refs.authentication.authComponent === 'ForgotPassword')
        setTimeout(() => {
          this.$refs.authentication.selectComponent('Login');
        }, 600);
    },
  },
  watch: {
    isLoggedIn: {
      handler(val) {
        if (val === true) {
          this.closeAuthModal();
        }
      },
      deep: true,
    },
  },
  provide() {
    return {
      isAuthModalShown: () => this.isAuthModalShown,
    };
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
@import 'assets/styles/common/modals.scss';
</style>
