<template>
  <div class="events-all-main">
    <molecule-full-calendar-features :allEvents="allEvents" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MoleculeFullCalendarFeatures from '../../components/molecules/MoleculeFullCalendarFeatures';
import actionTypes from '../../store/types/action-types';
import getterTypes from '../../store/types/getter-types';

export default {
  name: 'EventsAll',
  components: {
    MoleculeFullCalendarFeatures,
  },
  created() {
    this.$store.dispatch(actionTypes.GET_CURRENT_ANNIVERSARY);
    this.$store.dispatch(actionTypes.GET_SS_EVENTS);
    this.$store.dispatch(actionTypes.GET_CURRENT_SS);
    this.$store.dispatch(actionTypes.GET_MY_EVENTS);
  },
  computed: {
    ...mapGetters({
      USER_DATA: getterTypes.USER_DATA,
      MY_EVENTS: getterTypes.MY_EVENTS,
      SS_EVENTS: getterTypes.SS_EVENTS,
      CURRENT_SANTA_EVENTS: getterTypes.CURRENT_SANTA_EVENTS,
      MY_INVITED_EVENTS: getterTypes.MY_INVITED_EVENTS,
      MY_CONFIRMED_EVENTS: getterTypes.MY_CONFIRMED_EVENTS,
    }),
    allEvents() {
      const invited = this.MY_INVITED_EVENTS.map(v => v.event);
      return [
        ...this.MY_EVENTS.map(v => {
          v.status = 'anniversary';
          v.eventStatus = 'inProgress';
          v.backgroundColor = 'rgb(242, 153, 74)';
          return v;
        }),
        ...this.CURRENT_SANTA_EVENTS.map(v => {
          v.status = 'secret-santa';
          v.eventStatus = 'inProgress';
          v.backgroundColor = 'rgb(242, 153, 74)';
          return v;
        }),
        ...this.MY_CONFIRMED_EVENTS.map(v => {
          v.status = 'anniversary';
          v.backgroundColor = '#a0a8d7';
          return v;
        }),
        ...this.SS_EVENTS.map(v => {
          v.status = 'secret-santa';
          v.backgroundColor = '#a0a8d7';
          return v;
        }),
        ...invited.map(v => {
          v.status = 'invited';
          v.backgroundColor = '#a0a8d7';
          return v;
        }),
      ].map(item => {
        item.date = item.datetime;
        item.start = item.datetime;
        item.title = item.name;
        return item;
      });
    },
  },
};
</script>

<style scoped></style>
