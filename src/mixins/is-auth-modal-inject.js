export default {
  inject: {
    isAuthModalShown: { default: false },
  },
  computed: {
    isAuthModal() {
      return this.isAuthModalShown();
    },
  },
};
