<template>
  <section :id="itemId" class="faq-item">
    <aside class="icon-wrapper" :class="`icon-wrapper--${itemIconName}`">
      <lazy-load-image :src="require(`@/assets/images/svg/${itemIconName}.svg`)" class="icon-content" />
    </aside>

    <div class="faq-item-content">
      <atom-title class="faq-item-title" :text="itemTitle" />

      <transition name="faq-details" @enter="start" @after-enter="end" @before-leave="start" @after-leave="end">
        <div
          v-show="isItemActive"
          class="faq-item-details"
          :class="{ 'faq-item-details--active': isItemActive }"
          v-html="itemDetails"
        />
      </transition>

      <router-link v-slot="{ navigate }" custom tag="atom-button" :to="to">
        <atom-button
          class="faq-item-btn btn"
          background="btn-gradient-color"
          text-color="text-white-color"
          font-family="font-source-bold"
          text-size="text-14"
          @click.native="navigate"
        >
          {{ buttonText }}
        </atom-button>
      </router-link>
    </div>
  </section>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomButton from '@/components/atoms/AtomButton';

export default {
  name: 'MoleculeFaq',
  components: {
    AtomTitle,
    AtomButton,
  },
  props: {
    itemId: String,
    itemTitle: String,
    itemDetails: String,
    itemIconName: String,
  },
  computed: {
    to() {
      return this.isItemActive ? { name: 'Faq' } : { name: 'Faq', params: { tag: this.itemId } };
    },
    isItemActive() {
      return this.itemId === this.$route.params.tag;
    },
    buttonText() {
      return this.isItemActive ? this.$t('common.hide') : this.$t('common.more');
    },
  },
  methods: {
    start(el) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.opacity = 1;
    },
    end(el) {
      el.style.height = '';
      el.style.opacity = '';
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/molecules/MoleculeFaqItem.scss';
</style>
