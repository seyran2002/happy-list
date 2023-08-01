<template>
  <div class="logo">
    <atom-link :tag="tag" v-bind="$attrs">
      <aside :class="`icon-wrapper icon-wrapper--${icon}`">
        <lazy-load-image
          :viewportDistance="50"
          :alt="alt"
          :src="require(`@/assets/images/svg/${icon}.svg`)"
          class="icon-content"
          :width="width"
          :height="height"
        />
      </aside>
    </atom-link>
  </div>
</template>

<script>
import AtomLink from '../atoms/AtomLink';

export default {
  components: { AtomLink },
  props: {
    alt: {
      type: String,
    },
    tag: {
      type: String,
      default: 'router-link',
    },
    icon: {
      type: String,
      require: true,
    },
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
  },
};
</script>
