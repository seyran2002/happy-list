<template>
  <article class="first-invitation-item">
    <lazy-load-image :src="require(`@/assets/images/svg/${iconName}.svg`)" width="190" height="190" />

    <atom-button
      class="first-invitation-item-btn"
      :background="'btn-gradient-color'"
      text-color="text-white-color"
      font-family="font-source-bold"
      @click.native="showAuthModal(authComponent)"
    >
      {{ $t(buttonText) }}
    </atom-button>
  </article>
</template>

<script>
import AtomButton from '@/components/atoms/AtomButton';

export default {
  name: 'MoleculeFirstInvitationItem',
  components: {
    AtomButton,
  },
  props: {
    iconName: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    authComponent: {
      type: String,
      validator(value) {
        return ['OrganismInvitationLogin', 'OrganismInvitationRegister'].includes(value);
      },
    },
  },
  methods: {
    showAuthModal(component) {
      this.$eventHub.$emit('show-auth-modal', component);
    },
  },
};
</script>

<style scoped></style>
