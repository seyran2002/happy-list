<template>
  <fieldset
    class="form-label-group create-event--wrapper-info-form-block---form-input"
    :class="{
      'error-style': errors.has(name),
      'not-empty': inputVal.length !== 0,
    }"
  >
    <div class="hg-select-content">
      <atom-select-option
        :id="id"
        class="ml-40"
        :options="languages"
        :selected="selectedLang?.value"
        @select-option="selectOption"
      >
        <template v-slot:image>
          <p class="hg-selected-value">{{ selectedLang?.value }}</p>
          <img class="profile-pic" src="../../assets/images/svg/dropdown.svg" width="28" height="28" alt="" />
        </template>
      </atom-select-option>
    </div>

    <label :for="id">{{ label }} *</label>
    <span class="error-message">{{ errors.first(name) ? $t(`createEvent.${errors.first(name)}`) : '' }}</span>
  </fieldset>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import AtomSelectOption from '@/components/atoms/AtomSelectOption';

export default {
  name: 'MoleculeSelectLanguage',
  components: { AtomSelectOption },
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    validationRules: {
      type: String,
      required: true,
    },
  },
  component: {
    AtomSelectOption,
  },
  data() {
    return {
      currentLng: this.lang,
      inputVal: this.value,
      allLanguages: [
        {
          key: 'en',
          value: 'Eng',
        },
        {
          key: 'hy',
          value: 'Հայ',
        },
        {
          key: 'ru',
          value: 'Рус',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      lang: getterTypes.GET_LANGUAGE,
    }),
    selectedLang() {
      return this.allLanguages.find(lang => lang.key === this.currentLng);
    },
    languages() {
      return this.allLanguages.map(lang => ({
        ...lang,
        active: lang.key === this.currentLng,
      }));
    },
  },
  mounted() {
    this.currentLng = this.lang;
  },
  methods: {
    changeSelectedOption() {
      this.$emit('changeSelectedOption', this.currentLng, this.name);
    },
    selectOption(val) {
      this.currentLng = val.key;
      this.changeSelectedOption();
    },
  },
  watch: {
    value() {
      this.inputVal = this.value;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/molecules/MoleculeSelectLanguage';
</style>
