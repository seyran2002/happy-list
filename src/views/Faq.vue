<template>
  <div class="faq">
    <molecule-breadcrumbs :links="breadcrumbsLinks" />

    <atom-title class="faq-title" tag="h1" :text="$t('faq.howItWorks')" />

    <organism-faq />
  </div>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import MoleculeBreadcrumbs from '@/components/molecules/MoleculeBreadcrumbs';
import OrganismFaq from '@/components/organisms/OrganismFaq';

export default {
  name: 'FaqPage',
  components: {
    AtomTitle,
    MoleculeBreadcrumbs,
    OrganismFaq,
  },
  metaInfo() {
    return {
      title: this.$t('meta.faq.title'),
      meta: [{ vmid: 'description', name: 'description', content: this.$t('meta.faq.description') }],
    };
  },
  computed: {
    breadcrumbsLinks() {
      return [
        {
          to: '/',
          text: this.$t('pages.home'),
        },
        {
          to: '/faq',
          text: this.$t('header.howItWorks'),
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/pages/Faq.scss';
</style>
