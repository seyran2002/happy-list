<template>
  <div id="login" class="auth-form">
    <form ref="loginForm" autocomplete="off" @submit.prevent="validateForm">
      <div class="form-base form-label form-css-label">
        <fieldset
          :class="{
            'error-style': errors.has('username'),
            'not-empty': data.username.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="loginInput"
            v-model="data.username"
            v-validate="'required|phoneOrEmail'"
            type="text"
            name="username"
          />
          <label for="loginInput">{{ $t('auth.email') }} / {{ $t('auth.phone') }}</label>
          <span class="error-message">{{ errors.first('username') }}</span>
        </fieldset>

        <fieldset
          :class="{
            'error-style': errors.has('password'),
            'not-empty': data.password.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="passwordInput"
            v-model="data.password"
            v-validate="'required|min:6'"
            type="password"
            name="password"
          />
          <label for="passwordInput">{{ $t('auth.password') }}</label>
          <span class="error-message">{{ errors.first('password') }}</span>
        </fieldset>
      </div>

      <div class="underForm">
        <div class="underForm-forget-password overflow-hidden">
          <button type="button" @click="emitForgotPassword">{{ $t('auth.forgotPassword') }}</button>
        </div>

        <div class="underForm-social-row">
          <button type="button" class="v-btn-social underForm-social-row--google" @click="authenticate('google')">
            Google
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 8.00038V11.9977H15.6581C15.2909 13.0332 14.6461 13.9479 13.7943 14.6419C12.9425 15.3358 11.9164 15.7824 10.8281 15.9329C9.73973 16.0833 8.63096 15.9318 7.62286 15.4949C6.61475 15.0581 5.74606 14.3526 5.11165 13.4555C4.47724 12.5585 4.1015 11.5044 4.02545 10.4083C3.94941 9.31227 4.17598 8.21638 4.68044 7.24033C5.1849 6.26428 5.94784 5.4456 6.88596 4.87369C7.82408 4.30178 8.9013 3.99863 10 3.99733C11.4276 3.99479 12.808 4.50899 13.886 5.44494L16.5138 2.42886C14.707 0.859296 12.3933 -0.00344195 10 2.6456e-06C8.02219 2.6456e-06 6.08879 0.586495 4.4443 1.68531C2.79981 2.78412 1.51809 4.34591 0.761209 6.17317C0.00433287 8.00043 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10V8.00133L10 8.00038Z"
                fill="white"
              />
            </svg>
          </button>

          <button type="button" class="v-btn-social underForm-social-row--facebook" @click="authenticate('facebook')">
            Facebook
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 0H8C6.67392 0 5.40215 0.526784 4.46447 1.46447C3.52678 2.40215 3 3.67392 3 5V8H0V12H3V20H7V12H10L11 8H7V5C7 4.73478 7.10536 4.48043 7.29289 4.29289C7.48043 4.10536 7.73478 4 8 4H11V0Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        <div class="underForm-widi-button-wrapper">
          <button type="submit" class="v-btn-wide">{{ $t('common.proceed') }}</button>
        </div>
      </div>
    </form>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import showErrorsWithSnotify from '@/helpers/show-errors-with-snotify';
import isAuthModalInject from '@/mixins/is-auth-modal-inject';
import actionTypes from '../../store/types/action-types';

export default {
  name: 'OrganismLogin',
  mixins: [isAuthModalInject],
  data() {
    return {
      data: {
        username: '',
        password: '',
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        client_id: process.env.VUE_APP_CLIENT_ID,
        grant_type: 'password',
      },
    };
  },
  computed: {
    ...mapState({
      redirectAfterAuth: state => state.auth.redirectAfterAuth,
    }),
  },
  methods: {
    emitForgotPassword() {
      this.$emit('show-forgot-password');
    },
    login() {
      this.$store
        .dispatch(actionTypes.LOGIN, { data: this.data, i18n: this.$i18n })
        .then(response => {
          if (response.code || response.error === 'invalid_credentials') {
            if (response.code === 6 || response.error === 'invalid_credentials') {
              this.$snotify.error(response.message, '', {
                timeout: -1,
                showProgressBar: true,
              });
            }
          } else {
            const redirectUrl = this.redirectAfterAuth;
            if (redirectUrl) {
              this.$router.push(redirectUrl);
            } else {
              this.$router.push({ name: 'MyEvents' });
            }
          }
        })
        .catch(error => {
          this.$snotify.error(`${error.message} 😕`, '', {
            timeout: -1,
            showProgressBar: true,
          });
        });
    },
    authenticate(provider) {
      this.$store
        .dispatch(actionTypes.AUTHENTICATE, provider)
        .then(() => {})
        .catch(err => {
          this.$snotify.clear();
          showErrorsWithSnotify(err);
        });
    },
    facebookLoginWithUsername(username) {
      this.$store
        .dispatch(actionTypes.FACEBOOK_LOGIN_WITH_USERNAME, username)
        .then(resp => {
          if (this.$route.name === 'createEvent') {
            this.$router.go(0);
          } else if (resp.redirect) {
            this.$router.push({ name: 'MyEvents' });
          }
        })
        .catch(err => {
          this.$snotify.clear();
          showErrorsWithSnotify(err);
        });
    },
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login();
        }
      });
    },
  },
  watch: {
    isAuthModal(val) {
      if (!val && !this.$validator.errors.items.length) {
        this.data.username = '';
        this.data.password = '';
        this.$validator.reset();
      }
    },
  },
};
</script>
