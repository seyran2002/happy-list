<template>
  <div :style="`width: ${width}px`" class="main-text-block">
    <atom-title :text-size="title.textSize" :tag="title.tag" :text="title.value" />
    <atom-title
      v-if="subTitleLight"
      class="sub-title mt-12"
      :text-size="subTitleLight.textSize"
      :tag="subTitleLight.tag"
      :text="subTitleLight.value"
      :font-family="subTitleLight.fontFamily"
      :text-color="subTitleLight.textColor"
    />

    <div class="block-text my-55">
      <atom-title
        v-if="subTitle"
        class="sub-title mb-16"
        :text-size="subTitle.textSize"
        :tag="subTitle.tag"
        :text="subTitle.value"
        :font-family="subTitle.fontFamily"
        :text-color="subTitle.textColor"
      />
      <atom-text :text="paragraph.value" :font-family="paragraph.fontFamily" />
    </div>

    <atom-link
      :tag="button.tag"
      :to="{ name: button.pathName }"
      :text-size="button.textSize"
      :text-color="button.textColor"
      :font-family="button.fontFamily"
      :background="button.background"
      class="btn"
      :class="{ 'gtm-short-instruction': button.pathName === 'CreateEvent' }"
    >
      {{ button.value }}
    </atom-link>
  </div>
</template>

<script>
export default {
  components: {
    AtomText: () => import('../atoms/AtomText'),
    AtomTitle: () => import('../atoms/AtomTitle'),
    AtomLink: () => import('../atoms/AtomLink'),
  },
  props: {
    width: {},
    title: {
      type: Object,
    },
    subTitleLight: {
      type: Object,
    },
    subTitle: {
      type: Object,
    },
    paragraph: {
      type: Object,
    },
    button: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeTextBlock.scss';
</style>
