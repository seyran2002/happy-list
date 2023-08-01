<template>
  <organism-my-event-content />
</template>

<script>
import actionTypes from '@/store/types/action-types';
import windowSize from '@/mixins/window-size';
import OrganismMyEventContent from '@/components/organisms/OrganismMyEventContent';

export default {
  name: 'EventInvited',
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
      this.getCurrentInvitedEvent(val);
    },
  },
  mounted() {
    this.getCurrentInvitedEvent(this.eventId);
  },
  methods: {
    getCurrentInvitedEvent(id) {
      this.$store.dispatch(actionTypes.GET_CURRENT_ANNIVERSARY_BY_ID, id).then(() => {
        this.$store.dispatch(actionTypes.GET_ANNIVERSARY_PRESENTS, id);
        this.$store.dispatch(actionTypes.GET_ANNIVERSARY_GUESTS, id);
      });
    },
  },
};
</script>

<style scoped></style>
