<template>
  <div class="boxes">
    <atom-title class="boxes-title" textPosition="text-center" :tag="tag" :text="title" />
    <div class="boxes-main">
      <molecule-box v-for="box in boxes" :key="box.image" :transform="transform" :box="box" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AtomTitle: () => import('../atoms/AtomTitle'),
    MoleculeBox: () => import('../molecules/MoleculeBox'),
  },
  props: {
    transform: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    tag: {
      type: String,
    },
    boxes: {
      type: Array,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismBoxes.scss';
</style>
