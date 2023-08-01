export default {
  provide() {
    return {
      getFilterBy: () => this.filterBy,
      getFilterStr: () => this.filterStr,
    };
  },
  data() {
    return {
      filterBy: '',
      filterStr: '',
    };
  },
  methods: {
    setFilterBy(val) {
      this.filterBy = val;
    },
    setFilterStr(val) {
      this.filterStr = val;
    },
  },
};
