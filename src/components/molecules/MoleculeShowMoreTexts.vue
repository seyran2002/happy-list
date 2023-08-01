<template>
  <div class="hg-event-description-content">
    <atom-text
      ref="description"
      :class="['hg-event-description', { dots: !showMore }]"
      :text="paragraph.text"
      font-size="text-16"
    />
    <div v-if="longText" :class="['hg-hide-show-content', { 'hg-show-full': showMore }]">
      <atom-text
        class="hg-hide-show"
        tag="i"
        :text="$t(showMore ? 'common.showLess' : 'common.showMore')"
        @click="showMore = !showMore"
      />
    </div>
  </div>
</template>

<script>
import AtomText from '../atoms/AtomText';

export default {
  name: 'MoleculeShowMoreTexts',
  components: {
    AtomText,
  },
  props: {
    paragraph: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMore: false,
      longText: false,
    };
  },
  mounted() {
    this.longText = this.$refs.description.$el.scrollHeight > this.$refs.description.$el.clientHeight;
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeShowMoreTexts.scss';
</style>
