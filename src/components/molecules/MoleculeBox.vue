<template>
  <div :class="box.width ? box.width : ''" class="box text-center">
    <aside
      v-if="box.image"
      :class="
        transform
          ? `transform-translate-x icon-wrapper icon-wrapper--${box.image}`
          : `icon-wrapper icon-wrapper--${box.image}`
      "
    >
      <lazy-load-image
        :src="require(`@/assets/images/svg/${box.image}.svg`)"
        :width="box.widthImg"
        :height="box.heightImg"
        class="icon-content"
      />
    </aside>

    <div>
      <Roller
        v-if="box.roller"
        :class="[box.mT ? box.mT : '']"
        class="roller text-60 font-source-bold text-main-color"
        :text="`${box.roller}`"
        :transition="2"
      />

      <atom-span
        v-if="box.number"
        class="box-number"
        textPosition="text-center"
        :text="box.number"
        text-size="text-32"
      />

      <atom-title
        v-if="box.subTitle"
        class="box-title"
        textPosition="text-center"
        :text="box.subTitle"
        text-size="text-24"
        tag="h3"
      />

      <atom-text tag="h4" class="text-center" :text="box.text" />
    </div>
  </div>
</template>

<script>
import Roller from 'vue-roller';

export default {
  components: {
    AtomTitle: () => import('../atoms/AtomTitle'),
    AtomSpan: () => import('../atoms/AtomSpan'),
    AtomText: () => import('../atoms/AtomText'),
    Roller,
  },
  props: {
    transform: {
      type: Boolean,
      default: false,
    },
    box: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeBox.scss';
</style>
