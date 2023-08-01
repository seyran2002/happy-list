<template>
  <component
    :is="tag"
    class="atomLink"
    :class="[textSize, fontFamily, textColor, background, buttonPosition, borderColor]"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      require: true,
    },
    textSize: {
      type: String,
      validator(value) {
        return ['text-22', 'text-20', 'text-16', 'text-14', 'text-12', ''].includes(value);
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
        return ['btn-color', 'btn-gradient-color', 'bg-white', 'btn-default', ''].includes(value);
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
    borderColor: {
      type: String,
      validator(value) {
        return ['border-default-color', ''].includes(value);
      },
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/atoms/AtomLink.scss';
</style>
