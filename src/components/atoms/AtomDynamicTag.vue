<script>
export default {
  name: 'AtomDynamicTag',
  props: {
    tag: {
      type: String,
      required: true,
      default: 'div',
    },
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default);
  },
};
</script>

<style scoped></style>
