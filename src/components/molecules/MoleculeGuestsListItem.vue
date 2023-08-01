<template>
  <div
    :class="['guest-item', { 'hg-selection-list-item': isSelectionList }, { 'hg-chosen-item': isChosenGuest }]"
    @mousemove="isHover = true"
    @mouseleave="isHover = false"
    @blur="isHover = false"
    @click="selectGuest(guestId)"
  >
    <lazy-load-image
      v-if="avatar"
      :src="avatar"
      class="guest-avatar"
      :width="isSelectionList ? 20 : 32"
      :height="isSelectionList ? 20 : 32"
    />
    <div v-else>
      <lazy-load-image
        v-show="isChosenGuest"
        :src="require('@/assets/images/svg/user-white.svg')"
        class="guest-avatar"
        :width="isSelectionList ? 20 : 32"
        :height="isSelectionList ? 20 : 32"
      />
      <lazy-load-image
        v-show="!isChosenGuest"
        :src="require('@/assets/images/svg/user.svg')"
        class="guest-avatar"
        :width="isSelectionList ? 20 : 32"
        :height="isSelectionList ? 20 : 32"
      />
    </div>

    <div class="hg-guest-details">
      <atom-text :text="name" :textSize="isSelectionList ? 'text-18' : 'text-13'" class="hg-guest-name" />
      <atom-text v-if="!isSelectionList" :text="contact" textSize="text-12" class="hg-guest-contact" />
    </div>

    <div v-if="!isSelectionList" v-show="isHover" class="hg-hide-show-content">
      <div v-if="language" class="hg-guest-lng-content">
        <span>
          {{ $t('languages')[language] }}
        </span>
      </div>
      <span class="hg-delete-content">
        <img class="select-arrow" src="@/assets/images/svg/trash.svg" alt="" @click="confirmRemoveGuest(index)" />
      </span>
    </div>
  </div>
</template>

<script>
import AtomText from '@/components/atoms/AtomText';

export default {
  name: 'MoleculeGuestsListItem',
  components: {
    AtomText,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    guestId: {
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
    avatar: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
    isSelectionList: {
      type: Boolean,
      default: false,
    },
    selectedGuests: {
      type: Array,
      default: [],
    },
  },
  computed: {
    isChosenGuest() {
      return this.isSelectionList && this.selectedGuests.includes(this.guestId);
    },
  },
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    confirmRemoveGuest(index) {
      this.$emit('removeGuest', index);
    },
    selectGuest(guestId) {
      this.$emit('selectGuest', guestId);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/molecules/MoleculeGuestsListItem.scss';
</style>
