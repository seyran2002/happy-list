<template>
  <div class="presents-list">
    <molecule-presents-list-item
      v-for="(present, index) in presents"
      v-if="present"
      :id="present.id"
      :ref="`present-item-${present.id}`"
      :key="`present-item-${present.id}`"
      :description="present.description"
      :name="present.name"
      :present-image="present.image"
      :present-link="present.link"
      :index="index"
      @removePresent="confirmRemovePresent"
    />
  </div>
</template>

<script>
import MoleculePresentsListItem from '@/components/molecules/MoleculePresentsListItem';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismPresentsList',
  components: {
    MoleculePresentsListItem,
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    presentsList: {
      type: Array,
      default: [],
    },
    allPresentsCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      presents: this.presentsList,
    };
  },
  methods: {
    confirmRemovePresent(presentIndex) {
      const msg = this.$t('createEvent.delete_present_confirmation_msg', { name: this.presents[presentIndex].name });
      this.$snotify.confirm(msg, '', {
        timeout: -1,
        buttons: [
          {
            text: this.$t('createEvent.delete'),
            action: toast => {
              this.removePresent(presentIndex);
              this.$snotify.remove(toast.id);
              if (this.allPresentsCount <= 5) {
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
    removePresent(presentIndex) {
      this.$store
        .dispatch(actionTypes.DELETE_ANNIVERSARY_PRESENT, {
          presentID: this.presents[presentIndex].id,
          presentIndex,
          eventID: this.eventId,
        })
        .then(response => {
          this.$snotify.success(response);
        });
    },
  },
  watch: {
    presentsList() {
      this.presents = this.presentsList;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismPresentsList.scss';
</style>
