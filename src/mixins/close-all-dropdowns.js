export default {
  methods: {
    closeAllDropdowns({ refName, id }) {
      const filteredRefs = [];
      const pattern = new RegExp(`${refName}-${id}`);
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(this.$refs)) {
        if (!pattern.test(key) && value.length) {
          filteredRefs.push(value[0]);
        }
      }

      filteredRefs.forEach(ref => {
        ref.closeDropdown();
      });
    },
  },
};
