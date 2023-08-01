<template>
  <form class="new-event-form form-label form-css-label" autocomplete="off">
    <molecule-new-event-form :event-data="eventData" @changeInputVal="changeInputVal" />

    <atom-timepicker
      id="timeinput"
      v-model="eventData.time"
      :className="'form-label-group create-event--wrapper-info-form-block---form-input'"
      :labelText="`${$t('createEvent.time_field_label')}`"
      @set-time="timeValueChange"
    />

    <atom-textarea
      id="description"
      v-model="eventData.description"
      :label="`${$t('createEvent.description')}`"
      name="description"
      @changeInputVal="changeInputVal"
    ></atom-textarea>
    <atom-calendar v-model="eventData.date" @set-date="dateValueChange" />
  </form>
</template>

<script>
import AtomTimepicker from '@/components/atoms/AtomTimepicker';
import AtomCalendar from '@/components/atoms/AtomCalendar';
import AtomButton from '@/components/atoms/AtomButton';
import AtomTextarea from '@/components/atoms/AtomTextarea';
import MoleculeNewEventForm from '@/components/molecules/MoleculeNewEventForm';
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismNewEvent',
  components: {
    AtomTimepicker,
    AtomCalendar,
    AtomButton,
    AtomTextarea,
    MoleculeNewEventForm,
  },
  props: {},
  computed: {
    ...mapGetters({
      get_currentEvent: getterTypes.CURRENT_EVENT,
    }),
    currentEvent() {
      return this.get_currentEvent ? JSON.parse(JSON.stringify(this.get_currentEvent)) : false;
    },
  },
  data() {
    return {
      eventType: this.$route.params.eventType,
      eventData: {
        name: '',
        location: '',
        time: '',
        description: '',
        date: '',
      },
      validEventTime: false,
      validEventDate: true,
      tomorrow: '',
    };
  },
  mounted() {
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.eventData.date = this.formatDate(this.tomorrow);
    this.initCurrentEvent();
  },
  created() {
    this.$eventHub.$on('createEvent', this.validateForm);
  },
  methods: {
    initCurrentEvent() {
      if (this.currentEvent) {
        let eventTime = this.currentEvent.datetime.split(' ')[1];
        eventTime = `${eventTime.split(':')[0]}:${eventTime.split(':')[1]}`;
        let eventDate = this.currentEvent.datetime.split(' ')[0];
        if (new Date(eventDate) < this.tomorrow) {
          eventDate = this.formatDate(this.tomorrow);
        }

        if (eventTime) {
          this.validEventTime = true;
        }

        this.eventData = {
          id: this.currentEvent.id,
          name: this.currentEvent.name,
          location: this.currentEvent.location,
          time: eventTime,
          date: eventDate,
          description: this.currentEvent.description || '',
        };
      }
    },
    changeInputVal(val, name) {
      this.eventData[name] = val;
    },
    timeValueChange(e, isValid) {
      this.eventData.time = e;
      this.validEventTime = isValid;
    },
    dateValueChange(newDate) {
      this.validEventDate = !!newDate;
      this.eventData.date = newDate || this.tomorrow;
    },
    async validateForm() {
      await this.$eventHub.$emit('check-validate');
      if (!this.$validator.errors.items.length && this.eventData.name && this.validEventTime && this.validEventDate) {
        this.next();
      } else {
        this.$snotify.error(this.$t('createEvent.form_error_msg'));
      }
    },
    next() {
      const eventData = {
        name: this.eventData.name,
        location: this.eventData.location,
        description: this.eventData.description,
        datetime: `${this.formatDate(this.eventData.date)} ${this.eventData.time}:00`,
      };

      if (this.eventData.id) {
        const updateEventAction =
          this.eventType === 'secret-santa' ? actionTypes.UPDATE_SS_EVENT : actionTypes.UPDATE_ANNIVERSARY_EVENT;
        const self = this;
        this.$store.dispatch(updateEventAction, { payload: eventData, eventID: this.eventData.id }).then(() => {
          self.$eventHub.$emit('changeNewEventStep', 2);
        });
      } else {
        const createEventAction =
          this.eventType === 'secret-santa' ? actionTypes.CREATE_SS_EVENT : actionTypes.CREATE_ANNIVERSARY_EVENT;
        this.$store.dispatch(createEventAction, eventData).then(() => {
          this.$eventHub.$emit('changeNewEventStep', 2);
        });
      }
    },
    formatDate(date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join('-');
    },
  },
  beforeDestroy() {
    this.$eventHub.$off('createEvent', this.validateForm);
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismNewEvent.scss';
</style>
