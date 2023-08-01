<template>
  <component
    v-bind="$attrs"
    :is="tag"
    :class="[textSize, fontFamily, textColor]"
    @click="$emit('click')"
    v-html="text"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number],
      require: true,
    },
    tag: {
      type: String,
      default: 'p',
    },
    textSize: {
      type: String,
      validator(value) {
        return ['text-24', 'text-20', 'text-18', 'text-16', 'text-14', 'text-13', 'text-12'].includes(value);
      },
      default: 'text-16',
    },
    fontFamily: {
      type: String,
      validator(value) {
        return ['font-source-regular', 'font-source-light', 'font-source-semiBold', 'font-source-bold'].includes(value);
      },
      default: 'font-source-regular',
    },
    textColor: {
      type: String,
      validator(value) {
        return ['text-main-color', 'text-white-color', 'text-violet-color'].includes(value);
      },
      default: 'text-main-color',
    },
  },
};
</script>
