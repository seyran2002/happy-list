<template>
  <button :class="[textSize, textColor, fontFamily, background, buttonPosition]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AtomButton',
  props: {
    textSize: {
      type: String,
      validator(value) {
        return ['text-20', 'text-16', 'text-14', ''].includes(value);
      },
      default: '',
    },
    fontFamily: {
      type: String,
      validator(value) {
        return ['font-source-regular', 'font-source-bold', 'font-source-semiBold', ''].includes(value);
      },
      default: '',
    },
    textColor: {
      type: String,
      validator(value) {
        return ['text-main-color', 'text-white-color', 'text-red-color', ''].includes(value);
      },
      default: '',
    },
    background: {
      type: String,
      validator(value) {
        return ['btn-color', 'btn-white', 'btn-gradient-color', 'btn-default', ''].includes(value);
      },
      default: '',
    },
    buttonPosition: {
      type: String,
      validator(value) {
        return ['float-left', 'float-center', 'float-right', ''].includes(value);
      },
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/atoms/AtomButton.scss';
</style>
