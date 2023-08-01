<template>
  <form class="new-add-present-form form-label form-css-label" autocomplete="off" @submit.prevent="validateForm()">
    <h1 v-if="isShowTitle" class="text-center text-32 font-source-bold text-main-color hg-add-present-modal-title">
      {{ $t('createEvent.new_present') }}
    </h1>

    <molecule-new-present-form :present-data="presentData" @changeInputVal="changeInputVal" />

    <molecule-image-upload
      :image-url="presentData.image"
      name="presentImage"
      @uploadImage="uploadImage"
      @changeImage="changeImage"
    />

    <atom-button
      class="btn add-present-btn"
      background="btn-gradient-color"
      text-color="text-white-color"
      tag="button"
      font-family="font-source-semiBold"
      text-size="text-14"
      >{{ $t('createEvent.add_present') }}</atom-button>
  </form>
</template>

<script>
import AtomButton from '@/components/atoms/AtomButton';
import MoleculeNewPresentForm from '@/components/molecules/MoleculeNewPresentForm';
import MoleculeImageUpload from '@/components/molecules/MoleculeImageUpload';
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismAddPresent',
  components: {
    AtomButton,
    MoleculeNewPresentForm,
    MoleculeImageUpload,
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    isShowTitle: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      currentEventPresentImage: getterTypes.CURRENT_EVENT_PRESENT_IMAGE,
    }),
  },
  data() {
    return {
      eventType: this.type ? this.type : this.$route.params.eventType,
      presentData: {
        present_name: '',
        present_link: '',
        present_description: '',
        image: '',
      },
    };
  },
  mounted() {
    this.presentData.image = this.currentEventPresentImage;
  },
  methods: {
    changeInputVal(val, name) {
      this.presentData[name] = val;
    },
    uploadImage(imgDataUrl) {
      this.presentData.image = imgDataUrl;
    },
    changeImage() {
      this.presentData.image = this.currentEventPresentImage;
    },
    validateForm() {
      this.$eventHub.$emit('check-validate');
      if (this.presentData.present_name && !this.errors.items.length) {
        this.next();
      } else {
        this.$snotify.error(this.$t('createEvent.form_error_msg'));
      }
    },
    next() {
      const presentData = {
        event_id: this.eventId,
        name: this.presentData.present_name,
        description: this.presentData.present_description,
        link: this.presentData.present_link,
        images: [this.presentData.image],
      };

      this.$store.dispatch(actionTypes.ADD_ANNIVERSARY_PRESENT, presentData).then(response => {
        this.$snotify.success(response);
        this.resetNewPresentForm();
        this.$emit('present-added');
      });
    },
    resetNewPresentForm() {
      this.presentData = {
        present_name: '',
        present_link: '',
        present_description: '',
        image: '',
      };

      this.$eventHub.$emit('reset-form');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismAddPresent.scss';
</style>
