<template>
  <div :class="['guests-list', { 'hg-selection-list': isSelectionList }]">
    <molecule-guests-list-item
      v-for="(guest, index) in guests"
      v-if="guest && guest.user"
      :id="guest.user.id"
      :ref="`guest-item-${guest.user.id}`"
      :key="`guest-item-${guest.user.id}`"
      :guest-id="guest.id"
      :index="index"
      :name="guest.name"
      :avatar="guest.user.avatar"
      :contact="guest?.user?.username || guest?.user?.id.toString()"
      :language="guest?.user?.localization"
      :is-selection-list="isSelectionList"
      :selected-guests="selectedGuests"
      @removeGuest="confirmRemoveGuest"
      @selectGuest="selectGuest"
    />
  </div>
</template>

<script>
import MoleculeGuestsListItem from '@/components/molecules/MoleculeGuestsListItem';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismGuestsList',
  components: {
    MoleculeGuestsListItem,
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    guestsList: {
      type: Array,
      default: [],
    },
    allGuestsCount: {
      type: Number,
      required: true,
    },
    isSelectionList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      guests: this.guestsList,
      selectedGuests: [],
    };
  },
  methods: {
    selectGuest(guestID) {
      const index = this.selectedGuests.indexOf(guestID);
      if (index !== -1) {
        this.selectedGuests.splice(index, 1);
      } else {
        this.selectedGuests.push(guestID);
      }

      this.$eventHub.$emit('share-gift-guests-popup', this.selectedGuests);
    },
    confirmRemoveGuest(guestIndex) {
      const msg = this.$t('createEvent.delete_guest_confirmation_msg', { name: this.guests[guestIndex].name });
      this.$snotify.confirm(msg, '', {
        timeout: -1,
        buttons: [
          {
            text: this.$t('createEvent.delete'),
            action: toast => {
              this.removeGuest(guestIndex);
              this.$snotify.remove(toast.id);
              if (this.allGuestsCount <= 5) {
                this.$emit('hideGuestsFullList');
              }
            },
            bold: true,
          },
          {
            text: this.$t('createEvent.keep'),
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: false,
          },
        ],
      });
    },
    removeGuest(guestIndex) {
      const deleteGuestAction =
        this.eventType === 'secret-santa' ? actionTypes.DELETE_SS_GUEST : actionTypes.DELETE_ANNIVERSARY_GUEST;

      this.$store
        .dispatch(deleteGuestAction, { userID: this.guests[guestIndex].id, guestIndex, eventID: this.eventId })
        .then(response => {
          this.$snotify.success(response);
        });
    },
  },
  watch: {
    guestsList() {
      this.guests = this.guestsList;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismGuestsList.scss';
</style>
