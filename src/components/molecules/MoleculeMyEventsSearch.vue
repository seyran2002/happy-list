<template>
  <form class="my-events-search" action="" @submit.prevent>
    <div class="search-container">
      <atom-select-option
        class="search-dropdown"
        :options="filterOptions"
        :selected="selectedFilter.value"
        @select-option="selectFilterOption"
      />

      <label class="search-input-container" for="filter-input">
        <span class="search-input-icon" @click="clearInput">
          <transition name="input-icon-fade">
            <img :key="inputImage" :src="require(`@/assets/images/svg/${inputImage}.svg`)" alt="" />
          </transition>
        </span>

        <input
          id="filter-input"
          v-model="filterStr"
          class="search-input"
          type="text"
          :placeholder="selectedPlaceholder"
        />
      </label>
    </div>
  </form>
</template>

<script>
import AtomSelectOption from '@/components/atoms/AtomSelectOption';

export default {
  name: 'MoleculeMyEventsSearch',
  components: {
    AtomSelectOption,
  },
  data() {
    return {
      filterBy: 'guests',
      filterStr: '',
    };
  },
  created() {
    this.$eventHub.$on('setup-search', this.setupSearch);
  },
  computed: {
    filterOptionsInitial() {
      return [
        { key: 'guests', value: this.$t('faq.Guests') },
        { key: 'gifts', value: this.$t('faq.Presents') },
      ];
    },
    filterOptions() {
      return this.filterOptionsInitial.map(option => ({ ...option, active: option.key === this.filterBy }));
    },
    selectedFilter() {
      return this.filterOptions.find(option => option.key === this.filterBy);
    },
    selectedPlaceholder() {
      return this.filterBy === 'guests' ? this.$t('events.enterGuestName') : this.$t('events.enterGiftName');
    },
    inputImage() {
      return this.filterStr ? 'trash' : 'search';
    },
  },
  watch: {
    filterBy: {
      handler(val) {
        this.$emit('set-filter-by', val);
      },
      immediate: true,
    },
    filterStr: {
      handler(val) {
        this.$emit('set-filter-str', val);
      },
      immediate: true,
    },
  },
  methods: {
    selectFilterOption(e) {
      this.filterBy = e.key;
    },
    clearInput() {
      if (this.filterStr) {
        this.filterStr = '';
      }
    },
    setupSearch({ filterBy, filterStr }) {
      this.filterBy = filterBy;
      this.filterStr = filterStr;
    },
  },
  destroyed() {
    this.$eventHub.$off('setup-search', this.setupSearch);
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeMyEventsSearch.scss';
</style>
