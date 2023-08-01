<template>
  <organism-my-event-content />
</template>

<script>
import actionTypes from '@/store/types/action-types';
import windowSize from '@/mixins/window-size';
import OrganismMyEventContent from '@/components/organisms/OrganismMyEventContent';

export default {
  name: 'EventSecretSanta',
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
      this.getCurrentSSEvent(val);
    },
  },
  mounted() {
    this.getCurrentSSEvent(this.eventId);
  },
  methods: {
    getCurrentSSEvent(id) {
      this.$store.dispatch(actionTypes.GET_CURRENT_SS_BY_ID, id).then(() => {
        this.$store.dispatch(actionTypes.GET_SS_GUESTS, id);
      });
    },
  },
};
</script>

<style scoped></style>
