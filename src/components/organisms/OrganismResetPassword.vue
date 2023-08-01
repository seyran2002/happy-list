<template>
  <div id="resetPassword" class="auth-form">
    <atom-title
      tag="h1"
      text-size="text-32"
      :text="`${$t('auth.newPassword')}`"
      text-color="text-violet-color"
      text-position="text-center"
    >
      {{ $t('auth.newPassword') }}
    </atom-title>

    <form ref="resetPasswordForm" autocomplete="off" @submit.prevent="validateForm">
      <div class="form-base form-label form-css-label">
        <fieldset
          :class="{
            'error-style': errors.has('username'),
            'not-empty': data.username.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="loginInputReset"
            v-model="data.username"
            v-validate="'required|phoneOrEmail'"
            type="text"
            name="username"
          />
          <label for="loginInputReset">{{ $t('auth.email') }} / {{ $t('auth.phone') }}</label>
          <span v-if="errors.first('username')" class="error-message">{{
            $t(`auth.${errors.first('username')}`)
          }}</span>
        </fieldset>

        <fieldset
          :class="{
            'error-style': errors.has('password'),
            'not-empty': data.password.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="passwordInputReset"
            ref="password"
            v-model="data.password"
            v-validate="'required|min:6'"
            type="password"
            name="password"
          />
          <label for="passwordInputReset">{{ $t('auth.password') }}</label>
          <span v-if="errors.first('password')" class="error-message">{{
            $t(`auth.${errors.first('password')}`)
          }}</span>
        </fieldset>

        <fieldset
          :class="{
            'error-style': errors.has('password_confirmation'),
            'not-empty': data.password_confirmation.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="passwordConfirmationInputReset"
            v-model="data.password_confirmation"
            v-validate="'required|confirmed:password'"
            type="password"
            name="password_confirmation"
          />
          <label for="passwordConfirmationInputReset">{{ $t('auth.confirmPassword') }}</label>
          <span v-if="errors.first('password_confirmation')" class="error-message">{{
            $t(`auth.${errors.first('password_confirmation')}`)
          }}</span>
        </fieldset>
      </div>

      <div class="underForm">
        <div class="underForm-widi-button-wrapper">
          <button type="submit" class="v-btn-wide">{{ $t('common.proceed') }}</button>
        </div>
      </div>
    </form>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismResetPassword',
  components: {
    AtomTitle,
  },
  data() {
    return {
      data: {
        token: '',
        username: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  mounted() {
    this.data.token = this.$route.params.key;
  },
  methods: {
    reset() {
      this.$store.dispatch(actionTypes.POST_RESET_EMAIL, this.data).then(() => {
        this.$snotify.clear();
        this.$snotify.success(this.$t('auth.passwordResetSuccess'), '', {
          timeout: -1,
          showProgressBar: true,
        });

        setTimeout(() => this.$router.push('/'), 300);
      });
    },
    validateForm(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.reset();
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismAuthentication.scss';
</style>
