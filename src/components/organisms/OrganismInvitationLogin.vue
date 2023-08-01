<template>
  <div id="mergeWithExisting" class="auth-form">
    <atom-title
      class="mb-16"
      tag="h1"
      text-size="text-32"
      :text="`${$t('firstInvitation.mergeWithExisting')}`"
      text-color="text-violet-color"
      text-position="text-center"
    />

    <form ref="resetPasswordForm" autocomplete="off" @submit.prevent="validateForm">
      <div class="form-base form-label form-css-label">
        <fieldset
          :class="{ 'error-style': errors.has('username_old'), 'not-empty': mergeData.username_old.length !== 0 }"
          class="form-label-group"
        >
          <input
            id="loginMergeInput"
            v-model="mergeData.username_old"
            v-validate="'required|phoneOrEmail'"
            type="text"
            name="username"
          />
          <label for="loginMergeInput">{{ $t('auth.email') }} / {{ $t('auth.phone') }}</label>
          <span class="error-message">{{ errors.first('username_old') }}</span>
        </fieldset>

        <fieldset
          :class="{
            'error-style': errors.has('password'),
            'not-empty': mergeData.password.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="passwordInput"
            ref="password"
            v-model="mergeData.password"
            v-validate="'required|min:6'"
            type="password"
            name="password"
          />
          <label for="passwordInput">{{ $t('auth.password') }}</label>
          <span class="error-message">{{ errors.first('password') }}</span>
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
import showErrorsWithSnotify from '@/helpers/show-errors-with-snotify';
import AtomTitle from '@/components/atoms/AtomTitle';
import actionTypes from '@/store/types/action-types';
import isAuthModalInject from '@/mixins/is-auth-modal-inject';

export default {
  name: 'OrganismInvitationLogin',
  mixins: [isAuthModalInject],
  components: {
    AtomTitle,
  },
  data() {
    return {
      mergeData: {
        username: '',
        username_old: '',
        password: '',
        token: '',
      },
    };
  },
  mounted() {
    this.mergeData.username = this.$route.params.username;
    this.mergeData.token = this.$route.params.key;
  },
  watch: {
    isAuthModal(val) {
      if (!val && !this.$validator.errors.items.length) {
        this.mergeData.username = '';
        this.mergeData.password = '';
        this.$validator.reset();
      }
    },
  },
  methods: {
    merge() {
      this.$store
        .dispatch(actionTypes.USER_MERGE, this.mergeData)
        .then(resp => {
          this.$snotify.clear();
          this.$router.push({ name: resp.redirect }).catch(err => showErrorsWithSnotify(err.errors));
        })
        .catch(err => {
          this.$snotify.clear();
          showErrorsWithSnotify(err);
        });
    },
    validateForm(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.merge();
        }
      });
    },
  },
};
</script>

<style scoped></style>
