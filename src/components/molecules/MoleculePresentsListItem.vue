<template>
  <div
    :class="[{ 'present-has-img': presentImage, 'present-has-link': presentLink }, 'present-item']"
    @mousemove="isHover = true"
    @mouseleave="isHover = false"
    @blur="isHover = false"
    @click="openPresent()"
  >
    <div class="present-image-wrapper">
      <lazy-load-image v-if="presentImage" :src="presentImage" class="present-image" width="32" height="32" />
      <lazy-load-image
        v-else
        :src="require('@/assets/images/svg/logo-icon.svg')"
        class="present-image"
        width="32"
        height="32"
      />
      <img
        v-if="presentLink"
        class="present-image-link-icon"
        width="18"
        height="18"
        :src="require(`@/assets/images/svg/link.svg`)"
        alt=""
      />
    </div>

    <div class="hg-present-details" :class="{ 'hg-empty-description': !description }">
      <atom-text :text="name" :title="name" textSize="text-13" class="hg-present-name" />
      <atom-text :text="description" :title="description" textSize="text-12" class="hg-present-description" />
    </div>

    <div v-show="isHover" class="hg-hide-show-content">
      <span class="hg-delete-content">
        <img
          class="select-arrow"
          src="@/assets/images/svg/trash.svg"
          alt=""
          @click.stop.prevent="confirmRemovePresent(index)"
        />
      </span>
    </div>
  </div>
</template>

<script>
import AtomText from '@/components/atoms/AtomText';

export default {
  name: 'MoleculePresentsListItem',
  components: {
    AtomText,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    presentImage: {
      type: String,
      required: false,
    },
    presentLink: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    confirmRemovePresent(index) {
      this.$emit('removePresent', index);
    },
    openPresent() {
      if (this.presentLink) {
        window.open(this.presentLink, '_blank');
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/molecules/MoleculePresentsListItem.scss';
</style>
