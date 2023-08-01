<template>
  <div id="eventEdit" class="event-edit-form">
    <atom-title
      class="mb-16"
      tag="h1"
      text-size="text-32"
      :text="`${$t('events.editEvent')}`"
      text-color="text-violet-color"
      text-position="text-center"
    />

    <form autocomplete="off" @submit.prevent="validateForm('eventData')">
      <div class="form-base form-label form-css-label">
        <fieldset
          :class="{ 'error-style': errors.has('name'), 'not-empty': eventData.name.length !== 0 }"
          class="form-label-group"
        >
          <input id="nameInput" v-model="eventData.name" v-validate="'required'" type="text" name="name" />
          <label for="nameInput">{{ $t('createEvent.event_name') }} *</label>
          <span class="error-message">{{ errors.first('name') }}</span>
        </fieldset>

        <fieldset
          :class="{ 'error-style': errors.has('location'), 'not-empty': eventData.location.length !== 0 }"
          class="form-label-group"
        >
          <input id="locationInput" v-model="eventData.location" v-validate="'required'" type="text" name="location" />
          <label for="locationInput">{{ $t('createEvent.event_location') }} *</label>
          <span class="error-message">{{ errors.first('location') }}</span>
        </fieldset>

        <atom-timepicker
          id="timeinput"
          v-model="eventData.time"
          class="mb-24"
          :className="'form-label-group create-event--wrapper-info-form-block---form-input'"
          :labelText="`${$t('createEvent.time_field_label')}`"
          @set-time="timeValueChange"
        />
        <atom-textarea
          id="description"
          v-model="eventData.description"
          :label="`${$t('createEvent.description')}`"
          name="description"
          @changeInputVal="changeTextareaVal"
        ></atom-textarea>

        <atom-calendar v-model="eventData.date" class="mb-24" @set-date="dateValueChange" />

        <div class="underForm-widi-button-wrapper">
          <button type="submit" class="v-btn-wide">{{ $t('common.edit') }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomTimepicker from '@/components/atoms/AtomTimepicker';
import AtomTextarea from '@/components/atoms/AtomTextarea';
import AtomCalendar from '@/components/atoms/AtomCalendar';

export default {
  props: {
    event: {
      type: Object,
      required: true,
      default: null,
    },
    eventType: {
      type: String,
      default: 'anniversary',
    },
  },
  components: {
    AtomTitle,
    AtomTimepicker,
    AtomTextarea,
    AtomCalendar,
  },
  data() {
    return {
      eventData: {
        name: this.event.name,
        location: this.event.location,
        time: '',
        description: this.event.description || '',
        date: '',
      },
      validEventTime: true,
      validEventDate: true,
    };
  },
  computed: {
    ...mapGetters({
      lang: getterTypes.GET_LANGUAGE,
    }),
    datetime() {
      return `${this.formatDate(this.eventData.date)} ${this.eventData.time}:00`;
    },
  },
  mounted() {
    if (this.event) {
      this.setupInitialDatetime(this.event.datetime);
    }
  },
  watch: {
    event: {
      handler(val) {
        this.eventData.name = val.name;
        this.eventData.location = val.location;
        this.eventData.description = val.description || '';
        this.setupInitialDatetime(val.datetime);
      },
      immediate: true,
    },
  },
  methods: {
    setupInitialDatetime(datetime) {
      const dateStr = datetime.split(' ')[0];
      const timeStr = datetime.split(' ')[1];

      // setup date value
      this.eventData.date = dateStr;

      // setup time value
      let timeStrFormatted = timeStr.split(':');
      timeStrFormatted.pop();
      timeStrFormatted = timeStrFormatted.join(':');

      this.eventData.time = timeStrFormatted;
    },
    timeValueChange(e, isValid) {
      this.eventData.time = e;
      this.validEventTime = isValid;
    },
    changeTextareaVal(e) {
      this.eventData.description = e;
    },
    dateValueChange(newDate) {
      this.validEventDate = !!newDate;
      this.eventData.date = newDate || this.tomorrow;
    },
    validateForm(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.updateEvent();
        }
      });
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
    updateEvent() {
      this.$snotify.clear();

      const data = {
        ...this.eventData,
        datetime: this.datetime,
      };

      const updateEventAction =
        this.eventType === 'anniversary' ? actionTypes.UPDATE_ANNIVERSARY_EVENT : actionTypes.UPDATE_SS_EVENT;
      this.$store
        .dispatch(updateEventAction, { payload: data, eventID: this.event.id })
        .then(response => {
          if (response.errors) {
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const error in response.errors) {
              for (let i = 0; i < response.errors[error].length; i++) {
                this.$snotify.error(response.errors[error][i], '', {
                  timeout: -1,
                  showProgressBar: true,
                });
              }
            }
          } else {
            this.$snotify.success(this.$t('events.updatedSuccessfully'), '', {
              timeout: -1,
              showProgressBar: true,
            });

            this.$eventHub.$emit('updated-event');
          }
        })
        .catch(error => {
          this.$snotify.error(`${error.message} 😕`, '', {
            timeout: -1,
            showProgressBar: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
