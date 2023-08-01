<template>
  <div :class="{ 'items-center': itemsCenter, 'items-reverse pb-15': itemsReverse, 'block-image-main': true }">
    <molecule-text-block
      :width="mainBlock.width"
      :title="mainBlock.title"
      :sub-title-light="mainBlock.subTitleLight"
      :sub-title="mainBlock.subTitle"
      :paragraph="mainBlock.paragraph"
      :button="mainBlock.button"
    />
    <slot />
  </div>
</template>

<script>
export default {
  components: {
    MoleculeTextBlock: () => import('../molecules/MoleculeTextBlock'),
  },
  props: {
    mainBlock: {
      type: Object,
    },
    itemsCenter: {
      type: Boolean,
      default: false,
    },
    itemsReverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismBlockImage';
</style>
