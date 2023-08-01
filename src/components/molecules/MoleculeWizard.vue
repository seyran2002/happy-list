<template>
  <div :class="{ done1: step > 1, done2: step > 2 }" class="stepLine create-event--wrapper-info-form-block---stepper">
    <atom-wizard v-for="n in maxSteps" :key="n" :step="n" :current-step="step" :max-steps="maxSteps" />
  </div>
</template>

<script>
import AtomWizard from '@/components/atoms/AtomWizard';

export default {
  name: 'MoleculeWizard',
  components: {
    AtomWizard,
  },
  props: {
    step: {
      type: Number,
      default: 1,
    },
    maxSteps: {
      type: Number,
      default: 2,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeWizard.scss';
</style>
