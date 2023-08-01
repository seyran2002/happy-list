<template>
  <div class="hg-new-event-action-btns">
    <atom-link
      class="btn next-btn"
      text-color="text-white-color"
      tag="button"
      text-size="text-14"
      background="btn-gradient-color"
      font-family="font-source-bold"
      button-position="float-right"
      @click.native="$emit('next')"
      ><slot name="nextContent" />{{ isNextContent ? '' : $t('createEvent.next') }}</atom-link>

    <atom-link
      v-if="isShowBack"
      class="btn back-btn-sm"
      text-color="text-white-color"
      tag="button"
      text-size="text-14"
      background="btn-gradient-color"
      font-family="font-source-bold"
      button-position="float-right"
      @click.native="$emit('back')"
      ><img src="@/assets/images/svg/arrow-left-white.svg" width="8" height="12px" alt=""/></atom-link>

    <atom-link
      v-if="isShowCancel"
      class="btn cancel-btn-sm"
      tag="button"
      text-size="text-14"
      background="bg-white"
      font-family="font-source-regular"
      button-position="float-right"
      @click.native="$emit('confirmRemoveEvent')"
      >{{ $t('createEvent.cancel') }}</atom-link>
  </div>
</template>

<script>
import AtomLink from '@/components/atoms/AtomLink';

export default {
  name: 'MoleculeNewEventBtns',
  components: {
    AtomLink,
  },
  props: {
    isShowCancel: {
      type: Boolean,
      default: false,
    },
    isShowBack: {
      type: Boolean,
      default: false,
    },
    isNextContent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/molecules/MoleculeNewEventBtns.scss';
</style>
