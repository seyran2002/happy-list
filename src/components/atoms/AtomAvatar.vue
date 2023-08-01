<template>
  <img
    :class="{ 'select-arrow': true, 'border-radius-50': imageUrl }"
    :width="size"
    :height="size"
    :src="imageUrl === '' || imageUrl === null ? require('@/assets/images/svg/user.svg') : imageUrl"
    :title="title"
    :alt="title"
  />
</template>

<script>
export default {
  props: {
    title: {},
    size: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
