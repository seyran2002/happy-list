<template>
  <div class="breadcrumbs">
    <atom-link
      v-for="(link, index) in links"
      :key="`link_${index}`"
      :to="link.to"
      :class="{ active: $route.path === link.to }"
      :tag="getTag(index)"
      text-size="text-14"
      >{{ link.text }}
    </atom-link>
  </div>
</template>

<script>
import AtomLink from '@/components/atoms/AtomLink';

export default {
  name: 'MoleculeBreadcrumbs',
  components: {
    AtomLink,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getTag(index) {
      return index === this.links.length - 1 ? 'span' : 'router-link';
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeBreadcrumbs.scss';
</style>
