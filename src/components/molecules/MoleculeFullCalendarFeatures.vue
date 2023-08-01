<template>
  <div class="main-calendar-feature">
    <div class="calendar-feature">
      <atom-select-option :options="months" :selected="selectedMonth.value" @select-option="selectMonth" />
      <atom-select-option :options="years" :selected="selectedYear.value" @select-option="selectYear" />
    </div>
    <atom-full-calendar ref="calendar" :allEvents="allEvents" />
    <atom-link tag="router-link" :to="{ name: 'CreateEvent' }" class="round-link">
      <atom-round-icon color="blue" width="15" height="15" icon-name="plus" />
    </atom-link>
  </div>
</template>

<script>
import AtomFullCalendar from '../atoms/AtomFullCalendar';
import AtomSelectOption from '../atoms/AtomSelectOption';
import AtomLink from '../atoms/AtomLink';
import AtomRoundIcon from '../atoms/AtomRoundIcon';

export default {
  name: 'MoleculeFullCalendarFeature',
  props: {
    allEvents: {
      type: Array,
    },
  },
  components: {
    AtomFullCalendar,
    AtomSelectOption,
    AtomRoundIcon,
    AtomLink,
  },
  data() {
    return {
      activeDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`,
      },
    };
  },
  computed: {
    months() {
      return this.$t('profile.calendar.months').map((month, i) => ({
        key: month,
        active: i === Number(this.activeDate.month) - 1,
        value: month,
      }));
    },
    years() {
      const year = new Date().getFullYear();
      const years = [];
      for (let i = year - 5; i < year + 5; i++) {
        years.push({
          value: i,
          key: i,
          active: i === this.activeDate.year,
        });
      }
      return years;
    },
    selectedMonth() {
      return this.months.find(month => month.active);
    },
    selectedYear() {
      return this.years.find(year => year.active);
    },
  },
  watch: {
    activeDate: {
      deep: true,
      handler() {
        const api = this.$refs.calendar.$children[0].getApi();
        api.gotoDate(`${this.activeDate.year}-${this.activeDate.month}-01`);
      },
    },
  },
  methods: {
    selectMonth(e) {
      for (let i = 0; i < 12; i++) {
        if (this.months[i].value === e.value) {
          this.activeDate.month = i < 9 ? `0${i + 1}` : `${i + 1}`;
        }
      }
    },
    selectYear(e) {
      this.activeDate.year = Number(e.value);
    },
    eventClick(e) {
      console.log(e);
      // this.clickedEvent = this.$store.getters.getEvents(e.event.id);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeFullCalendarFeatures.scss';
</style>
