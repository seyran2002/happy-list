<template>
  <div class="footer">
    <div class="size">
      <molecule-icon-link class="text-center" width="120" height="60" to="/" alt="Happy List logo" icon="logo" />
      <div class="footer-socials">
        <molecule-icon-link
          v-for="(social, index) in socialLinks"
          :key="social.name"
          :viewportDistance="50"
          :alt="social.name"
          class="text-center"
          :class="{ 'ml-28': index !== 0 }"
          tag="a"
          target="_blank"
          :href="social.path"
          :icon="social.name"
        />
      </div>
      <div class="footer-line"></div>
      <atom-text class="text-center" :text="`©2022 Happy List&emsp;&emsp; ${$t('footer.text')}`" />
    </div>
  </div>
</template>

<script>
import MoleculeIconLink from '../molecules/MoleculeIconLink';
import AtomText from '../atoms/AtomText';

export default {
  components: {
    MoleculeIconLink,
    AtomText,
  },
  data() {
    return {
      socialLinks: [
        { name: 'facebook', path: 'https://www.facebook.com/happylist.in/?ref=page_internal' },
        { name: 'instagram', path: 'https://www.instagram.com/happylist.in/?utm_medium=copy_link' },
        { name: 'messenger', path: 'https://m.me/happylist.in?ref=Welcome%20Message' },
        { name: 'gmail', path: 'mailto:info@happylist.in' },
      ],
    };
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismFooter.scss';
</style>
