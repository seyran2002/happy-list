<template>
  <label class="toggle-button" :class="{ active: isActive }">
    <span class="toggle-label">
      <slot />
    </span>

    <input
      :id="`${id}-toggle`"
      v-model="checkedValue"
      class="toggle-checkbox"
      type="checkbox"
      :disabled="disabled"
      @change="changeToggleVal"
    />
    <span class="toggle-switch"></span>
  </label>
</template>

<script>
export default {
  name: 'AtomToggle',
  props: {
    defaultState: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      currentState: this.defaultState,
    };
  },
  watch: {
    defaultState: {
      handler(val) {
        this.currentState = val;
      },
      immediate: true,
    },
  },
  computed: {
    isActive() {
      return this.currentState;
    },
    checkedValue: {
      get() {
        return this.currentState;
      },
      set(newValue) {
        this.currentState = newValue;
      },
    },
  },
  methods: {
    changeToggleVal() {
      this.$emit('change-toggle-val', this.currentState);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/atoms/AtomToggle.scss';
</style>
