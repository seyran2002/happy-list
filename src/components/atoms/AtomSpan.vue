<template>
  <span :class="[textSize, fontFamily, textColor, textPosition]" v-text="text" />
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number],
      require: true,
      default: '',
    },
    textSize: {
      type: String,
      validator(value) {
        return [
          'text-60',
          'text-50',
          'text-40',
          'text-32',
          'text-24',
          'text-20',
          'text-19',
          'text-16',
          'text-12',
        ].includes(value);
      },
      default: 'text-50',
    },
    fontFamily: {
      type: String,
      validator(value) {
        return ['font-source-light', 'font-source-regular', 'font-source-semiBold', 'font-source-bold'].includes(value);
      },
      default: 'font-source-bold',
    },
    textColor: {
      type: String,
      validator(value) {
        return ['text-main-color', 'text-second-color', 'text-white-color', 'text-violet-color'].includes(value);
      },
      default: 'text-main-color',
    },
    textPosition: {
      type: String,
      validator(value) {
        return ['text-left', 'text-center', 'text-right', ''].includes(value);
      },
      default: '',
    },
  },
};
</script>
