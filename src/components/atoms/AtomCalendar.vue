<template>
  <div class="calendar-content">
    <div>
      <div ref="target" :style="{ position: 'relative' }"></div>
      <date-picker
        ref="datepicker"
        v-model="selectedDate"
        valueType="format"
        :lang="$i18n.locale"
        :disabled-date="notBeforeToday"
        popup-class="hg-event-calendar"
        open
        @input="onDateRangeChange"
      ></date-picker>
    </div>
    <span v-if="!selectedDate" class="error-message"> {{ $t('createEvent.date_is_required') }}</span>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import '@/locales/calendar/am';

export default {
  name: 'AtomCalendar',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  components: { DatePicker },
  data() {
    return {
      selectedDate: this.value,
    };
  },
  mounted() {
    const el = this.$refs.datepicker.$refs.popup.$el;
    this.$refs.target.appendChild(el);
  },
  methods: {
    onDateRangeChange() {
      this.$emit('set-date', this.selectedDate);
    },
    notBeforeToday(date) {
      return date <= new Date(new Date().setHours(0, 0, 0, 0));
    },
  },
  watch: {
    value() {
      this.selectedDate = this.value;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/atoms/AtomCalendar.scss';
</style>
