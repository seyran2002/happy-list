<template>
  <div class="main-links">
    <atom-link
      v-for="(link, index) in links"
      :key="link.text"
      :to="{ name: link.name }"
      text-size="text-16"
      font-family="font-source-regular"
      text-color="text-main-color"
      class="link"
      :class="[
        {
          'ml-40': index,
          'router-link-exact-active': link.name === 'CreateEvent' && $route.name === 'NewEvent',
          'gtm-short-instruction': link.name === 'CreateEvent' || link.name === 'Faq',
        },
        link.classes,
      ]"
      tag="router-link"
    >
      {{ link.text }}
    </atom-link>
  </div>
</template>

<script>
import AtomLink from '../atoms/AtomLink';

export default {
  name: 'MoleculeLinks',
  components: {
    'atom-link': AtomLink,
  },
  props: {
    links: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculesLinks.scss';
</style>
