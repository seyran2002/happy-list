<template>
  <div id="changePassword" class="auth-form">
    <atom-title tag="h1" text-size="text-20" :text="`${$t('profile.changePassword')}`" text-color="text-violet-color">
      {{ $t('auth.newPassword') }}
    </atom-title>

    <form ref="changePasswordForm" autocomplete="off" @submit.prevent="validateForm">
      <div class="form-base form-label form-css-label">
        <atom-input
          v-for="item in inputs"
          :id="item.id"
          :key="item.id"
          ref="inputs"
          v-model="item.value"
          type="password"
          :validation-rules="item.validationRules"
          :label="item.label"
          :name="item.name"
          translation-word="profile"
          @changeInputVal="changeInputVal"
        />
      </div>

      <atom-button
        text-size="text-14"
        text-color="text-white-color"
        button-position="float-right"
        font-family="font-source-bold"
        background="btn-gradient-color"
        class="btn hg-update-pwd-btn"
      >
        {{ $t('profile.update') }}
      </atom-button>
    </form>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomInput from '@/components/atoms/AtomInput';
import AtomButton from '@/components/atoms/AtomButton';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismChangePassword',
  components: {
    AtomTitle,
    AtomInput,
    AtomButton,
  },
  computed: {
    inputs() {
      return [
        {
          id: 'current_password',
          name: 'current_password',
          value: this.data.current_password,
          label: this.$t('profile.currentPassword'),
          validationRules: 'required|min:6',
        },
        {
          id: 'new_password',
          name: 'new_password',
          value: this.data.new_password,
          label: this.$t('profile.newPassword'),
          validationRules: 'required|min:6',
        },
        {
          id: 'password_confirmation',
          name: 'password_confirmation',
          value: this.data.password_confirmation,
          label: this.$t('profile.confirmPassword'),
          validationRules: 'required|min:6',
        },
      ];
    },
  },
  data() {
    return {
      data: {
        current_password: '',
        new_password: '',
        password_confirmation: '',
      },
    };
  },
  methods: {
    changeInputVal(val, name) {
      this.data[name] = val;
    },
    changePassword() {
      const data = {
        current_password: this.data.current_password,
        password: this.data.new_password,
        password_confirmation: this.data.password_confirmation,
      };
      console.log('data', data);

      this.$store.dispatch(actionTypes.CHANGE_PWD, data).then(() => {
        this.resetForm();
        this.$snotify.clear();
        this.$snotify.success(this.$t('auth.passwordResetSuccess'), '', {
          timeout: -1,
          showProgressBar: true,
        });
      });
    },
    resetForm() {
      this.data = {
        current_password: '',
        new_password: '',
        password_confirmation: '',
      };
      this.$eventHub.$emit('reset-form');
    },
    validateForm(scope) {
      for (let i = 0; i < this.$refs.inputs.length; i++) {
        this.$refs.inputs[i].checkValidate();
      }

      this.$validator.validateAll(scope).then(result => {
        if (
          this.data.current_password &&
          this.data.new_password &&
          this.data.password_confirmation &&
          result &&
          !this.$validator.errors.items.length
        ) {
          this.changePassword();
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismChangePassword.scss';
</style>
