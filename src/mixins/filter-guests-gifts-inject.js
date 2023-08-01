export default {
  inject: {
    getFilterBy: { default: 'guests' },
    getFilterStr: { default: '' },
  },
  computed: {
    filterBy() {
      if (['EventsSecretSanta', 'EventSecretSanta'].includes(this.$route.name)) {
        return 'guests';
      }

      return this.getFilterBy();
    },
    filterStr() {
      if (['EventsSecretSanta', 'EventSecretSanta'].includes(this.$route.name)) {
        return '';
      }

      return this.getFilterStr();
    },
  },
};
