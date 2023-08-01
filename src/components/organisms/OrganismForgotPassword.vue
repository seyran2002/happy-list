<template>
  <div id="forgotPassword">
    <div class="form-base form-label form-css-label">
      <div class="text-center mb-4">
        <h1>{{ $t('auth.resetPassword') }}</h1>
      </div>

      <form autocomplete="off" @submit.prevent="validateForm()">
        <fieldset
          :class="{ 'error-style': errors.has('username'), 'not-empty': data.username.length !== 0 }"
          class="form-label-group"
        >
          <input
            id="resetInput"
            v-model="data.username"
            v-validate="'required|phoneOrEmail'"
            type="text"
            name="username"
          />

          <label for="resetInput">{{ $t('auth.email') }} / {{ $t('auth.phone') }}</label>
          <span v-if="errors.first('username')" class="error-message">{{
            $t(`auth.${errors.first('username')}`)
          }}</span>
        </fieldset>

        <div class="text-center mt-5 pb-1">
          <button type="submit" class="v-btn-wide">
            {{ $t('common.proceed') }}
          </button>
        </div>

        <div class="text-right mt-12 pb-1">
          <atom-button type="button" class="btn-default hg-back-to-login" tag="button" @click.native="backToLogin">
            {{ $t('auth.back_to_login') }}
          </atom-button>
        </div>
      </form>
      <div v-if="instruction">
        <p class="instruction">{{ $t('auth.sentPasswordResetLink') }} {{ device }}</p>
        <p class="instruction" style="color: #e01812">{{ $t('auth.linkWillBeValid') }}</p>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import showErrorsWithSnotify from '@/helpers/show-errors-with-snotify';
import i18n from '@/i18n';
import actionTypes from '@/store/types/action-types';
import AtomButton from '@/components/atoms/AtomButton';

export default {
  name: 'OrganismForgotPassword',
  components: {
    AtomButton,
  },
  data() {
    return {
      data: {
        username: '',
      },
    };
  },
  computed: {
    ...mapState({
      instruction: state => state.auth.passwordInstruction,
    }),
    device() {
      return this.data.username.indexOf('@') > -1 ? this.$i18n.t('auth.emailDevice') : this.$i18n.t('auth.phoneDevice');
    },
  },
  methods: {
    backToLogin() {
      this.$eventHub.$emit('close-organism-modal');
      this.$eventHub.$emit('show-modal-auth');
    },
    reset() {
      this.$store
        .dispatch(actionTypes.GET_RESET_EMAIL, this.data.username)
        .then(resp => {
          this.$snotify.clear();
          this.$snotify.success(i18n.t(resp), '', {
            timeout: -1,
            showProgressBar: true,
          });
        })
        .catch(err => {
          this.$snotify.clear();
          showErrorsWithSnotify(err);
        });
    },
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.reset();
        }
      });
    },
  },
  beforeDestroy() {
    this.data.username = '';
    this.$emit('reset-auth-component');
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismForgotPassword.scss';
</style>
