<template>
  <div>
    <div v-for="(link, index) in links" :key="link.text" class="menu-links" :class="{ 'mt-26': index }">
      <atom-link
        :to="{ name: link.name }"
        text-size="text-20"
        font-family="font-source-semiBold"
        text-color="text-white-color"
        class="link"
        tag="router-link"
      >
        {{ link.text }}
      </atom-link>
      <img src="../../assets/images/svg/slag.svg" alt="" />
    </div>
    <div class="line-menu my-37"></div>
  </div>
</template>

<script>
import AtomLink from '../atoms/AtomLink';

export default {
  components: {
    AtomLink,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeMenuLinks.scss';
</style>
