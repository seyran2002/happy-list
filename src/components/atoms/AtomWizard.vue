<template>
  <span>
    <span
      class="stepNumber create-event--wrapper-info-form-block---stepper-number"
      :class="{ filledStep: step <= currentStep, 'hg-link-step': step < currentStep }"
      @click="goStep"
      >{{ step }}</span>
    <span
      v-if="step !== maxSteps"
      :class="[{ santaLine: maxSteps === 2 }, `line line${step} create-event--wrapper-info-form-block---stepper-line`]"
    ></span>
  </span>
</template>

<script>
export default {
  name: 'AtomWizard',
  props: {
    step: {
      type: Number,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
    maxSteps: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goStep() {
      if (this.step < this.currentStep) {
        this.$eventHub.$emit('changeNewEventStep', this.step);
      }
    },
  },
};
</script>
