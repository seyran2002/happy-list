<template>
  <div class="first-invitation-block">
    <molecule-first-invitation-item
      icon-name="hiddenPerson"
      button-text="firstInvitation.firstTime"
      auth-component="OrganismInvitationRegister"
    />

    <molecule-first-invitation-item
      icon-name="personRound"
      button-text="firstInvitation.registered"
      auth-component="OrganismInvitationLogin"
    />
  </div>
</template>

<script>
import MoleculeFirstInvitationItem from '@/components/molecules/MoleculeFirstInvitationItem';

export default {
  name: 'OrganismFirstInvitation',
  components: {
    MoleculeFirstInvitationItem,
  },
};
</script>

<style scoped></style>
