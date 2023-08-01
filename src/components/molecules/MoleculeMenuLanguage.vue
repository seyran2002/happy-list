<template>
  <div class="menu-main-language">
    <atom-title
      class="text-left"
      textColor="text-white-color"
      :text="$t('header.platformLanguage')"
      text-size="text-20"
      fontFamily="font-source-semiBold"
      tag="h5"
    />
    <div class="menu-languages">
      <button v-for="lang in languages" :key="lang.key" @click="$emit('choose-language', lang)">
        <atom-text
          class="mt-26"
          :class="{ active: lang.active }"
          text-color="text-white-color"
          :text="lang.value"
          text-size="text-20"
          :font-family="lang.active ? 'font-source-bold' : 'font-source-semiBold'"
        />
      </button>
    </div>
  </div>
</template>

<script>
import AtomTitle from '../atoms/AtomTitle';
import AtomText from '../atoms/AtomText';

export default {
  components: {
    AtomTitle,
    AtomText,
  },
  props: {
    languages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeMenuLanguage.scss';
</style>
