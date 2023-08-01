<template>
  <div class="calendar-input-content">
    <p :class="{ 'label-calendar': true, active: selectedDate }">{{ $t('profile.dateOfBirth') }}</p>
    <div>
      <date-picker
        :id="$i18n.locale"
        v-model="selectedDate"
        :editable="false"
        valueType="format"
        format="YYYY-MM-DD"
        :lang="$i18n.locale"
        :disabled-date="notBeforeToday"
        popup-class="hg-event-calendar"
        @input="onDateRangeChange"
      ></date-picker>
    </div>
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
      required: true,
    },
  },
  components: { DatePicker },
  data() {
    return {
      selectedDate: this.value,
    };
  },
  methods: {
    onDateRangeChange() {
      this.$emit('set-date', this.selectedDate);
    },
    notBeforeToday(date) {
      return date >= new Date(new Date(new Date() - 497664000000).setHours(0, 0, 0, 0));
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
@import '../../assets/styles/atoms/AtomInputCalendar.scss';
</style>
