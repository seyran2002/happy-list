<template>
  <div class="reset-password">
    <organism-modal v-show="isAuthModalShown" @close="closeResetPasswordModal">
      <template v-slot:body>
        <organism-reset-password />
      </template>
    </organism-modal>
  </div>
</template>

<script>
import OrganismModal from '../components/organisms/OrganismModal';
import OrganismResetPassword from '../components/organisms/OrganismResetPassword';

export default {
  name: 'ResetPasswordPage',
  components: {
    OrganismModal,
    OrganismResetPassword,
  },
  data() {
    return {
      isAuthModalShown: true,
    };
  },
  methods: {
    closeResetPasswordModal() {
      this.isAuthModalShown = false;
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
@import '../assets/styles/pages/ResetPassword.scss';
</style>
