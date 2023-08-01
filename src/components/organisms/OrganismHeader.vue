<template>
  <header class="header">
    <div class="size">
      <div class="header-main">
        <molecule-icon-link
          v-show="!isWhiteLogo && $route.name"
          to="/"
          width="120"
          height="60"
          icon="logo"
          class="header-logo"
          alt="HappyList logo"
        />
        <molecule-icon-link
          v-show="isWhiteLogo && $route.name"
          to="/"
          width="120"
          height="60"
          icon="logo-white"
          class="header-logo hg-header-logo-white"
          alt="HappyList logo"
        />

        <div class="header-links">
          <molecule-links :links="links" />

          <atom-link
            v-if="!this.user"
            class="btn ml-40"
            text-color="text-white-color"
            tag="button"
            text-size="text-14"
            background="btn-color"
            font-family="font-source-bold"
            @click.native="initAuthModal"
          >
            {{ $t('header.login') + '/' + $t('header.register') }}
          </atom-link>

          <atom-select-option v-else class="ml-40" :options="userLinks" @select-option="selectLink">
            <template v-slot:image>
              <img
                v-if="user.avatar"
                class="profile-pic"
                :src="user.avatar"
                :alt="user.name"
                width="28"
                height="28"
                :title="user.name"
              />
              <img
                v-else-if="!isWhiteLogo && $route.name"
                class="profile-pic"
                src="../../assets/images/svg/user.svg"
                :alt="user.name"
                width="28"
                height="28"
                :title="user.name"
              />
              <img
                v-else-if="$route.name"
                class="profile-pic"
                src="../../assets/images/svg/user-white.svg"
                :alt="user.name"
                width="28"
                height="28"
                :title="user.name"
              />
            </template>
          </atom-select-option>

          <atom-select-option
            v-if="$route.name"
            class="ml-40"
            :selected="selectedLang.value"
            :options="languages"
            :is-white-logo="isWhiteLogo"
            @select-option="selectLanguage"
          />
        </div>

        <button class="burger-menu-icon" @click="showPopupMobileMenu">
          <lazy-load-image :src="require(`@/assets/images/svg/menu.svg`)" width="24" height="24" alt="menu-icon" />
        </button>
      </div>
    </div>

    <transition name="mobile-menu-fade">
      <organism-menu
        v-if="showMobileMenu"
        :languages="languages"
        :links="links"
        @close-menu="showPopupMobileMenu"
        @choose-language="selectLanguage"
        @show-auth-modal="initAuthModal"
      />
    </transition>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import showErrorsWithSnotify from '@/helpers/show-errors-with-snotify';
import clickOutside from '@/directives/click-outside';
import actionTypes from '@/store/types/action-types';
import getterTypes from '@/store/types/getter-types';
import MoleculeLinks from '../molecules/MoleculeLinks';
import MoleculeIconLink from '../molecules/MoleculeIconLink';
import AtomLink from '../atoms/AtomLink';
import OrganismMenu from './OrganismMenu';
import AtomSelectOption from '../atoms/AtomSelectOption';

export default {
  components: {
    AtomLink,
    MoleculeIconLink,
    MoleculeLinks,
    OrganismMenu,
    AtomSelectOption,
  },
  directives: {
    clickOutside,
  },
  data() {
    return {
      showMobileMenu: false,
      activeHeader: false,
      allLanguages: [
        {
          key: 'en',
          value: 'Eng',
        },
        {
          key: 'hy',
          value: 'Հայ',
        },
        {
          key: 'ru',
          value: 'Рус',
        },
      ],
      loggedInConsole: false,
    };
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$store
        .dispatch(actionTypes.GET_MY_PROFILE_INFO)
        .then()
        .catch(err => {
          showErrorsWithSnotify(err);
        });
    }

    window.addEventListener('scroll', this.scroll);
    window.addEventListener('click', this.printInConsole);
  },
  methods: {
    initAuthModal() {
      this.$emit('show-auth-modal');
    },
    showPopupMobileMenu() {
      if (this.showMobileMenu) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }

      this.showMobileMenu = !this.showMobileMenu;
    },
    selectLanguage(option, isCloseModal) {
      if (isCloseModal) {
        this.showPopupMobileMenu();
      }
      const changeLngAction = this.isLoggedIn ? actionTypes.CHANGE_LANG : actionTypes.UPDATE_LANG;
      this.$store.dispatch(changeLngAction, { lang: option.key, i18n: this.$i18n });
    },
    async selectLink(option) {
      // eslint-disable-next-line default-case
      switch (option.key) {
        case 'profile':
          await this.$router.push({ name: 'Profile' });
          break;
        case 'logout':
          await this.$store
            .dispatch(actionTypes.LOGOUT)
            .then()
            .catch(err => {
              showErrorsWithSnotify(err);
            });
          await this.$router.push({ name: 'Home' });
          break;
        case 'logoutAll':
          await this.$store
            .dispatch(actionTypes.LOGOUT_ALL)
            .then()
            .catch(err => {
              showErrorsWithSnotify(err);
            });
          await this.$router.push({ name: 'Home' });
          break;
      }
    },
    scroll() {
      const navBar = document.getElementsByClassName('header')[0];
      const bodyEl = document.getElementsByTagName('body')[0];
      if (window.scrollY > navBar.offsetTop + 50) {
        this.activeHeader = true;
        bodyEl.classList.add('active-header');
      } else {
        this.activeHeader = false;
        bodyEl.classList.remove('active-header');
      }

      this.printInConsole();
    },
    printInConsole() {
      if (!this.loggedInConsole) {
        /* eslint-disable no-console */
        console.clear();
        console.log(this.$t('common.consoleGreetingMsg'), 'font-size: 20px; color: #e04531;');
        console.log('%c📧 - way2up.armenia@gmail.com', 'font-size: 20px; color: #3054d7;');
        console.log('%c☎️ - +37455575994', 'font-size: 20px; color: #3054d7;');
        console.log('%c☎️ - +491627935547', 'font-size: 20px; color: #3054d7;');
        console.log(
          '%c       ',
          'font-size: 100px; background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzkwNV84MjUpIj4KPHBhdGggZD0iTTU5LjAzMzIgMzEuNTIyOEg1NC4wODAxVjE1LjEwOTJMNTkuMDMzMiAxMy45MjEyVjMxLjUyMDhWMzEuNTIyOFpNNDguMDgwMSAzMS41MjI4SDQyLjQ4MDVWMTcuODkyOUw0OC4wODAxIDE2LjU1MDFWMzEuNTIxOFYzMS41MjI4WiIgZmlsbD0iIzYxNTlBOSIvPgo8cGF0aCBkPSJNNjAuNDgyMiAzMS41MjNMNjUuNDMzMiAzMS41MjNWMTUuMTExTDYwLjQ4MjIgMTMuOTIzVjMxLjUyM1pNNzEuNDMzMiAzMS41MjNINzcuMDMzMlYxNy44OTNMNzEuNDMzMiAxNi41NVYzMS41MjNaIiBmaWxsPSIjNjE1OUE5Ii8+CjxwYXRoIGQ9Ik00MS4wMDIgMTcuNjQxOVYxMi40MTE5TDQ3LjA4MiAxMC42MzEyVjE2LjEzMTJMNDEuMDAzOSAxNy42MzhMNDEuMDAyIDE3LjY0MTlaTTUzLjA3ODEgMTQuNjQxOVY4Ljg2ODk2TDU5LjEyNSA3LjA5Njk4VjEzLjE0MzlMNTMuMDgwMSAxNC42NDM5TDUzLjA3ODEgMTQuNjQxOVoiIGZpbGw9IiM2MTU5QTkiLz4KPHBhdGggZD0iTTc4LjEyNSAxNy42NDJWMTIuNDEyTDcyLjA0NSAxMC42MjlWMTYuMTI5TDc4LjEyNSAxNy42NDJaTTY2LjA0OSAxNC42NDJWOC44NzE5N0w2MC4wMDIgNy4wOTk5N1YxMy4xNDdMNjYuMDQ3IDE0LjY0Mkg2Ni4wNDlaIiBmaWxsPSIjNjE1OUE5Ii8+CjxwYXRoIGQ9Ik00OS4yMTcgOC4zMjc5NEM0OC45NzggNy43NzM2MyA0OC44NTc5IDcuMTc1NjggNDguODYzNSA2LjU3MjA4QzQ4Ljg2NSA2LjA5MzA3IDQ4Ljk3MzYgNS42MjAxMiA0OS4xNzk5IDUuMTg3ODFDNDkuMzg2MiA0Ljc1NTUgNDkuNjg1NCA0LjM3NDYgNTAuMDU2OCA0LjA3MjA4QzUwLjc5MDcgMy40Njc1NSA1MS43MDU5IDMuMTI2NzIgNTIuNjU2NCAzLjEwNDhINTIuNzM2NUM1My42MjI3IDMuMTMyNCA1NC40ODQ2IDMuNDAyMDggNTUuMjI4NyAzLjg4NDA5QzU2LjAwNjYgNC4zMzc2NyA1Ni42MDU2IDUuMDQzMjYgNTYuOTI3OSA1Ljg4NDA5QzU2LjAyOTYgNS4wNTcxNSA1NC44NSA0LjYwNTA3IDUzLjYyOTEgNC42MjA5MUM1Mi41MDAyIDQuNjA2MjggNTEuNDAwOSA0Ljk5MDQ3IDUwLjUyNzUgNS43MDU4N0M1MC4xMzIzIDYuMDIyNDYgNDkuODExIDYuNDIxMDkgNDkuNTg0MiA2Ljg3Mzg0QzQ5LjM1NzQgNy4zMjY2IDQ5LjIzMTkgNy44MjI4MSA0OS4yMTUgOC4zMjg5Mkw0OS4yMTcgOC4zMjc5NFoiIGZpbGw9IiM2MTU5QTkiLz4KPHBhdGggZD0iTTY5LjU3MTcgOC4zMjg5OEM2OS44MDgzIDcuNzcyODcgNjkuOTI4NyA3LjE3NDMgNjkuOTI1NyA2LjU2OTk4QzY5LjkyNDMgNi4wOTA5NSA2OS44MTY2IDUuNjE4MjEgNjkuNjEwMyA1LjE4NTg3QzY5LjQwMzkgNC43NTM1NCA2OS4xMDQyIDQuMzcyNDEgNjguNzMyNyA0LjA2OTk4QzY4LjAwMTEgMy40NjU1MiA2Ny4wODc1IDMuMTI0NTkgNjYuMTM4NyAzLjEwMTk4SDY2LjA1ODdDNjUuMTcyNSAzLjEyOTI4IDY0LjMxMDcgMy4zOTg2OCA2My41NjY3IDMuODgwOThDNjIuNzg4NiA0LjMzNDMgNjIuMTg4OCA1LjAzOTk4IDYxLjg2NjcgNS44ODA5OEM2Mi43NjE1IDUuMDU1ODMgNjMuOTM3NyA0LjYwMzY3IDY1LjE1NDcgNC42MTY5OEM2Ni4yODM2IDQuNjAzMTUgNjcuMzgxMyA0Ljk4NzY4IDY4LjI1NDcgNS43MDI5OEM2OC42NTA4IDYuMDE5NjEgNjguOTczNSA2LjQxODMyIDY5LjIwMDcgNi44NzE2NkM2OS40Mjc5IDcuMzI0OTkgNjkuNTU0MSA3LjgyMjE4IDY5LjU3MDcgOC4zMjg5OEg2OS41NzE3WiIgZmlsbD0iIzYxNTlBOSIvPgo8cGF0aCBkPSJNNy45MjkzNSA1NkgxMS4xNjM0VjUwLjAxNkgxNi4xMTM0VjU2SDE5LjM2OTRWNDEuNjU2SDE2LjExMzRWNDcuMTc4SDExLjE2MzRWNDEuNjU2SDcuOTI5MzVWNTZaTTI1Ljc2NzYgNTAuMDZMMjYuMTE5NiA0OC43NEMyNi41MTU2IDQ3LjMxIDI2Ljg4OTYgNDUuNjM4IDI3LjI0MTYgNDQuMTJIMjcuMzI5NkMyNy43MDM2IDQ1LjYxNiAyOC4wOTk2IDQ3LjMxIDI4LjQ5NTYgNDguNzRMMjguODI1NiA1MC4wNkgyNS43Njc2Wk0zMC4zNjU2IDU2SDMzLjc5NzZMMjkuMzA5NiA0MS42NTZIMjUuNDE1NkwyMC45Mjc2IDU2SDI0LjIyNzZMMjUuMTA3NiA1Mi41OUgyOS40ODU2TDMwLjM2NTYgNTZaTTM1LjM2NDkgNTZIMzguNTk4OVY1MS4xMzhINDAuMzgwOUM0My40MTY5IDUxLjEzOCA0NS45OTA5IDQ5LjY0MiA0NS45OTA5IDQ2LjI3NkM0NS45OTA5IDQyLjggNDMuNDM4OSA0MS42NTYgNDAuMjkyOSA0MS42NTZIMzUuMzY0OVY1NlpNMzguNTk4OSA0OC41NjRWNDQuMjNINDAuMDk0OUM0MS44NTQ5IDQ0LjIzIDQyLjgyMjkgNDQuNzggNDIuODIyOSA0Ni4yNzZDNDIuODIyOSA0Ny43NzIgNDEuOTY0OSA0OC41NjQgNDAuMTgyOSA0OC41NjRIMzguNTk4OVpNNDguNDcwNCA1Nkg1MS43MDQ0VjUxLjEzOEg1My40ODY0QzU2LjUyMjQgNTEuMTM4IDU5LjA5NjQgNDkuNjQyIDU5LjA5NjQgNDYuMjc2QzU5LjA5NjQgNDIuOCA1Ni41NDQ0IDQxLjY1NiA1My4zOTg0IDQxLjY1Nkg0OC40NzA0VjU2Wk01MS43MDQ0IDQ4LjU2NFY0NC4yM0g1My4yMDA0QzU0Ljk2MDQgNDQuMjMgNTUuOTI4NCA0NC43OCA1NS45Mjg0IDQ2LjI3NkM1NS45Mjg0IDQ3Ljc3MiA1NS4wNzA0IDQ4LjU2NCA1My4yODg0IDQ4LjU2NEg1MS43MDQ0Wk02My44MjUgNTZINjcuMDU5VjUwLjg5Nkw3MS4zOTMgNDEuNjU2SDY4LjAwNUw2Ni43MDcgNDQuOTU2QzY2LjMxMSA0Ni4wMzQgNjUuOTE1IDQ3LjAyNCA2NS40OTcgNDguMTI0SDY1LjQwOUM2NS4wMTMgNDcuMDI0IDY0LjYzOSA0Ni4wMzQgNjQuMjQzIDQ0Ljk1Nkw2Mi45NjcgNDEuNjU2SDU5LjQ5MUw2My44MjUgNTAuODk2VjU2Wk03Ny43NjM5IDU2SDg1LjQ2MzlWNTUuMTJINzguNzc1OVY0MS41MDJINzcuNzYzOVY1NlpNODguMDMzNCA1Nkg4OS4wNDU0VjQxLjUwMkg4OC4wMzM0VjU2Wk05Ny4xMDI2IDU2LjI2NEM5OS45MTg2IDU2LjI2NCAxMDEuNzQ1IDU0LjU5MiAxMDEuNzQ1IDUyLjM3QzEwMS43NDUgNTAuMTQ4IDEwMC4zMTUgNDkuMjQ2IDk4LjY4NjYgNDguNTJMOTYuNDg2NiA0Ny41NTJDOTUuNDMwNiA0Ny4wNjggOTMuOTc4NiA0Ni40MyA5My45Nzg2IDQ0Ljc1OEM5My45Nzg2IDQzLjE3NCA5NS4yNzY2IDQyLjE2MiA5Ny4xOTA2IDQyLjE2MkM5OC42NDI2IDQyLjE2MiA5OS43ODY2IDQyLjc1NiAxMDAuNjQ1IDQzLjYzNkwxMDEuMjE3IDQyLjk3NkMxMDAuMzM3IDQyLjAzIDk4LjkyODYgNDEuMjM4IDk3LjE5MDYgNDEuMjM4Qzk0Ljc3MDYgNDEuMjM4IDkyLjk2NjYgNDIuNzEyIDkyLjk2NjYgNDQuODAyQzkyLjk2NjYgNDYuOTU4IDk0LjY2MDYgNDcuODYgOTUuOTE0NiA0OC40MUw5OC4xMTQ2IDQ5LjRDOTkuNTQ0NiA1MC4wMzggMTAwLjcxMSA1MC42MSAxMDAuNzExIDUyLjQzNkMxMDAuNzExIDU0LjE1MiA5OS4zMjQ2IDU1LjM0IDk3LjEwMjYgNTUuMzRDOTUuNDMwNiA1NS4zNCA5My45MTI2IDU0LjU3IDkyLjg1NjYgNTMuMzgyTDkyLjE5NjYgNTQuMDg2QzkzLjM0MDYgNTUuMzYyIDk0Ljk5MDYgNTYuMjY0IDk3LjEwMjYgNTYuMjY0Wk0xMDcuNDg2IDU2SDEwOC40OThWNDIuMzgySDExMy4xMThWNDEuNTAySDEwMi44NjZWNDIuMzgySDEwNy40ODZWNTZaIiBmaWxsPSIjNjE1OUE5Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMzkwNV84MjUiPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=) no-repeat;'
        );
        /* eslint-enable */

        this.loggedInConsole = true;
      }
    },
  },
  computed: {
    ...mapState({
      user: state => state.auth.userData,
      lang: state => state.lang.lang,
    }),
    ...mapGetters({
      isLoggedIn: getterTypes.IS_LOGGED_IN,
    }),
    languages() {
      return this.allLanguages.map(lang => ({
        ...lang,
        active: lang.key === this.lang,
      }));
    },
    links() {
      return this.user
        ? [
            { name: 'MyEvents', text: this.$t('header.myEvents') },
            { name: 'Faq', text: this.$t('header.howItWorks') },
            { name: 'CreateEvent', text: this.$t('header.create') },
          ]
        : [
            { name: 'Faq', text: this.$t('header.howItWorks') },
            { name: 'CreateEvent', text: this.$t('header.create') },
          ];
    },
    userLinks() {
      return [
        {
          key: 'profile',
          value: this.$t('header.profile'),
        },
        {
          key: 'logout',
          value: `${this.$t('header.logout')} <small>(${this.$t('header.thisDevice')})</small>`,
        },
        {
          key: 'logoutAll',
          value: `${this.$t('header.logout')} <small>(${this.$t('header.allDevices')})</small>`,
        },
      ];
    },
    selectedLang() {
      return this.allLanguages.find(lang => lang.key === this.lang);
    },
    isWhiteLogo() {
      return this.$route.name === 'NewEvent' && !this.activeHeader;
    },
  },
  watch: {
    lang() {
      this.loggedInConsole = false;
      this.printInConsole();
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
    window.removeEventListener('click', this.printInConsole);
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismHeader.scss';
</style>
