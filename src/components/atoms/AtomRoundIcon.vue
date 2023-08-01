<template>
  <div :class="`round round-${color}`">
    <aside :class="`icon-wrapper icon-wrapper--${iconName}`">
      <lazy-load-image
        :alt="iconName"
        :src="require(`@/assets/images/svg/${iconName}.svg`)"
        class="icon-content"
        :width="width"
        :height="height"
      />
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    iconName: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/atoms/AtomRoundIcon';
</style>
