<template>
  <div class="first-invitation">
    <template v-if="!isLoggedIn">
      <atom-title :text="$t('firstInvitation.accept')" text-position="text-center" />

      <organism-first-invitation />

      <organism-modal v-show="isModalShown" class="base-modal" @close="closeAuthModal">
        <template v-slot:body>
          <component :is="authComponent" :login-or-registration="loginOrRegistration" />
        </template>
      </organism-modal>
    </template>

    <div v-else class="first-invitation-logged">
      <atom-title
        class="mb-24"
        :text="$t('firstInvitation.alreadyLoggedIn')"
        tag="h3"
        text-position="text-center"
        text-size="text-24"
        font-family="font-source-regular"
      />

      <atom-button class="btn" text-size="text-16" @click.native="logout">{{ $t('header.logout') }}</atom-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import showErrorsWithSnotify from '@/helpers/show-errors-with-snotify';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomText from '@/components/atoms/AtomText';
import AtomButton from '@/components/atoms/AtomButton';
import OrganismFirstInvitation from '@/components/organisms/OrganismFirstInvitation';

export default {
  name: 'FirstInvitationPage',
  components: {
    AtomTitle,
    AtomText,
    AtomButton,
    OrganismFirstInvitation,
    OrganismAuthentication: () => import('@/components/organisms/OrganismAuthentication'),
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismInvitationLogin: () => import('@/components/organisms/OrganismInvitationLogin'),
    OrganismInvitationRegister: () => import('@/components/organisms/OrganismInvitationRegister'),
  },
  data() {
    return {
      authComponent: null,
      isModalShown: false,
      loginOrRegistration: 'Login',
    };
  },
  metaInfo() {
    return {
      title: this.$t('firstInvitation.accept'),
      meta: [{ vmid: 'description', name: 'description', content: 'The First Invitation page' }],
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.IS_LOGGED_IN,
    }),
  },
  created() {
    this.$eventHub.$on('show-auth-modal', this.showAuthModal);
  },
  methods: {
    showAuthModal(component) {
      if (localStorage.getItem('event_token')) {
        if (component === 'OrganismInvitationRegister') {
          this.loginOrRegistration = 'Registration';
        } else {
          this.loginOrRegistration = 'Login';
        }
        this.authComponent = 'OrganismAuthentication';
      } else {
        this.authComponent = component;
      }
      this.isModalShown = true;
      document.body.classList.add('modal-open');
    },
    closeAuthModal() {
      this.isModalShown = false;
      document.body.classList.remove('modal-open');
    },
    async logout() {
      await this.$store
        .dispatch(actionTypes.LOGOUT)
        .then()
        .catch(err => {
          showErrorsWithSnotify(err);
        });
    },
  },
  destroyed() {
    this.authComponent = null;
    this.$eventHub.$off('show-auth-modal', this.showAuthModal);
  },
};
</script>

<style lang="scss">
@import '../assets/styles/pages/FirstInvitation.scss';
</style>
