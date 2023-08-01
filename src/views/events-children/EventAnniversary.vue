<template>
  <organism-my-event-content />
</template>

<script>
import actionTypes from '@/store/types/action-types';
import windowSize from '@/mixins/window-size';
import OrganismMyEventContent from '@/components/organisms/OrganismMyEventContent';

export default {
  name: 'EventAnniversary',
  mixins: [windowSize],
  components: {
    OrganismMyEventContent,
  },
  computed: {
    eventId() {
      return this.$route.params.id;
    },
  },
  watch: {
    eventId(val) {
      this.getCurrentAnniversaryEvent(val);
    },
  },
  mounted() {
    this.getCurrentAnniversaryEvent(this.eventId);
  },
  methods: {
    getDescription() {
      return this.currentEvent.description ? this.currentEvent.description.slice(0, 160) : '';
    },
    getCurrentAnniversaryEvent(id) {
      this.$store.dispatch(actionTypes.GET_CURRENT_ANNIVERSARY_BY_ID, id).then(() => {
        this.$store.dispatch(actionTypes.GET_ANNIVERSARY_PRESENTS, id);
        this.$store.dispatch(actionTypes.GET_ANNIVERSARY_GUESTS, id);
      });
    },
  },
};
</script>

<style scoped></style>
