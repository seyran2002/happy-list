<template>
  <div class="head-menu" :style="{ height: `${windowHeight}px` }">
    <div class="size">
      <div class="profile"></div>
      <button class="close-menu" @click="closeMenu">
        <img src="../../assets/images/svg/close.svg" alt="" />
      </button>
      <div class="flex-1 mb-16">
        <molecule-menu-links :links="menuLinks" />
        <molecule-menu-language :languages="languages" @choose-language="e => $emit('choose-language', e, true)" />
      </div>
      <atom-link
        v-if="!user"
        textSize="text-14"
        textColor="text-main-color"
        background="bg-white"
        class="btn-white"
        tag="button"
        fontFamily="font-source-bold"
        @click.native="showAuthModal"
      >
        {{ $t('header.login') }} | {{ $t('header.register') }}
      </atom-link>
      <template v-else>
        <atom-link
          text-size="text-14"
          text-color="text-main-color"
          background="bg-white"
          class="btn-white"
          tag="button"
          font-family="font-source-bold"
          @click.native="logout"
        >
          {{ $t('header.logout') }} {{ $t('header.thisDevice') }}
        </atom-link>
        <atom-link
          text-size="text-14"
          text-color="text-main-color"
          background="bg-white"
          class="btn-white"
          tag="button"
          font-family="font-source-bold"
          @click.native="logoutAll"
        >
          {{ $t('header.logout') }} {{ $t('header.allDevices') }}
        </atom-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import showErrorsWithSnotify from '@/helpers/show-errors-with-snotify';
import actionTypes from '@/store/types/action-types';
import windowSize from '@/mixins/window-size';
import AtomLink from '../atoms/AtomLink';
import MoleculeMenuLinks from '../molecules/MoleculeMenuLinks';
import MoleculeMenuLanguage from '../molecules/MoleculeMenuLanguage';

export default {
  mixins: [windowSize],
  props: {
    languages: {
      type: Array,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
  },
  components: {
    MoleculeMenuLinks,
    MoleculeMenuLanguage,
    AtomLink,
  },
  computed: {
    ...mapState({
      user: state => state.auth.userData,
    }),
    menuLinks() {
      return [...(this.user ? [{ name: 'Profile', text: this.$t('header.profile') }] : []), ...this.links];
    },
  },
  watch: {
    $route() {
      this.closeMenu();
    },
  },
  methods: {
    showAuthModal() {
      this.$emit('show-auth-modal');
    },
    async logout() {
      await this.$store
        .dispatch(actionTypes.LOGOUT)
        .then()
        .catch(err => {
          showErrorsWithSnotify(err);
        });
      this.$nextTick(() => this.closeMenu());
      await this.$router.push({ name: 'Home' });
    },
    async logoutAll() {
      await this.$store
        .dispatch(actionTypes.LOGOUT_ALL)
        .then()
        .catch(err => {
          showErrorsWithSnotify(err);
        });
      this.$nextTick(() => this.closeMenu());
      await this.$router.push({ name: 'Home' });
    },
    closeMenu() {
      this.$emit('close-menu');
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismMenu.scss';
</style>
