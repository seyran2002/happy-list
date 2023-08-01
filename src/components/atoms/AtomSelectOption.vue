<template>
  <div class="select-option">
    <button
      v-click-outside="onClickOutside"
      type="button"
      class="d-flex items-center pointer select-button"
      @click="showOption = !showOption"
    >
      <template v-if="!hasImageSlotContent">
        <atom-text :text="selected" textSize="text-16" />
        <img
          v-if="!isWhiteLogo"
          class="select-arrow"
          width="28"
          height="28"
          src="../../assets/images/svg/dropdown.svg"
          alt=""
        />
        <img
          v-else
          class="select-arrow"
          width="28"
          height="28"
          src="../../assets/images/svg/dropdown-white.svg"
          alt=""
        />
      </template>
      <slot v-else name="image"></slot>
      <div v-if="showOption" class="options">
        <button
          v-for="option in options"
          :key="option.key"
          type="button"
          :class="{ pointer: true, 'active-option': option.active }"
          @click="$emit('select-option', option)"
        >
          <atom-text :text="option.value" textSize="text-16" />
        </button>
      </div>
    </button>
  </div>
</template>

<script>
import AtomText from './AtomText';

export default {
  components: {
    AtomText,
  },
  props: {
    selected: {
      type: [String, Number],
    },
    options: {
      type: Array,
      required: true,
    },
    isWhiteLogo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showOption: false,
    };
  },
  computed: {
    hasImageSlotContent() {
      return !!this.$slots.image;
    },
  },
  methods: {
    onClickOutside() {
      if (this.showOption) {
        this.showOption = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/atoms/AtomSelectOption.scss';
</style>
