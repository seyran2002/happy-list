<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription" @click.stop>
        <header id="modalTitle" class="modal-header">
          <slot name="header" />

          <button v-if="isShowCloseIcon" type="button" class="modal-close-btn" aria-label="Close modal" @click="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#11064A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6 6L18 18" stroke="#11064A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </header>

        <section id="modalDescription" class="modal-body">
          <slot name="body" />
        </section>

        <footer class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OrganismModal',
  props: {
    isShowCloseIcon: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.$eventHub.$on('close-organism-modal', this.close);
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismModal.scss';
</style>
