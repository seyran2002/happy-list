<template>
  <div id="registration" class="auth-form">
    <atom-title
      tag="h1"
      text-size="text-32"
      :text="`${$t('firstInvitation.activateNewAccount')}`"
      text-color="text-violet-color"
      text-position="text-center"
    />

    <form autocomplete="off" @submit.prevent="validateForm">
      <div class="form-base form-label form-css-label">
        <fieldset
          :class="{ 'error-style': errors.has('password'), 'not-empty': data.password.length !== 0 }"
          class="form-label-group"
        >
          <input
            id="passwordInput"
            ref="password"
            v-model="data.password"
            v-validate="'required|min:6'"
            type="password"
            name="password"
          />
          <label for="passwordInput">{{ $t('auth.password') }}</label>
          <span class="error-message">{{ errors.first('password') }}</span>
        </fieldset>

        <fieldset
          :class="{
            'error-style': errors.has('password_confirmation'),
            'not-empty': data.password_confirmation.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="passwordConfirmationInput"
            v-model="data.password_confirmation"
            v-validate="'required|confirmed:password'"
            type="password"
            name="password_confirmation"
          />
          <label for="passwordConfirmationInput">{{ $t('auth.confirmPassword') }}</label>
          <span class="error-message">{{ errors.first('password_confirmation') }}</span>
        </fieldset>
      </div>

      <div class="underForm pt-3">
        <label :class="['underForm-form-checkboxes', 'checkbox-container', { 'error-style': !privacy }]">
          <input
            id="registerPrivacy"
            v-model="privacy"
            v-validate="'required'"
            type="checkbox"
            name="privacy"
            @keyup.enter="privacy = !privacy"
          />
          <span class="checkbox-container-checkmark"></span>

          <label for="registerPrivacy" :style="[privacy ? {} : { color: '#e01812' }]">
            {{ $t('auth.agreeWith') }}
            <router-link :to="{ name: 'Privacy' }" target="_blank">{{ $t('auth.userAgreement') }}</router-link>
          </label>
          <span class="error-message checkbox-container-error-message">{{ errors.first('privacy') }}</span>
        </label>

        <div class="underForm-widi-button-wrapper">
          <button type="submit" class="v-btn-wide" :disabled="!privacy">{{ $t('common.proceed') }}</button>
        </div>
      </div>
    </form>

    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import actionTypes from '../../store/types/action-types';

export default {
  name: 'OrganismInvitationRegister',
  components: {
    AtomTitle,
  },
  data() {
    return {
      data: {
        username: '',
        password: '',
        password_confirmation: '',
        token: '',
      },
      privacy: true,
    };
  },
  mounted() {
    if (this.$route.params.username) {
      this.data.username = this.$route.params.username;
      this.data.token = this.$route.params.key;
    }
  },
  methods: {
    activate() {
      this.$snotify.clear();
      this.$store
        .dispatch(actionTypes.POST_RESET_EMAIL, this.data)
        .then(response => {
          if (response) {
            const data = {
              client_secret: process.env.VUE_APP_CLIENT_SECRET,
              client_id: process.env.VUE_APP_CLIENT_ID,
              grant_type: 'password',
              username: this.data.username,
              password: this.data.password,
            };

            this.$store.dispatch(actionTypes.LOGIN, { data, i18n: this.$i18n }).then(() => {
              this.$router.push({ name: 'MyEvents' });
            });
          } else {
            this.$snotify.error(`${response.message} 😕`, '', {
              timeout: -1,
              showProgressBar: true,
            });
          }
        })
        .catch(error => {
          this.$snotify.error(`${error.message} 😕`, '', {
            timeout: -1,
            showProgressBar: true,
          });
        });
    },
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.activate();
        }
      });
    },
  },
};
</script>
