<template>
  <div id="addGift" class="event-edit-form">
    <atom-title
      class="mb-16"
      tag="h1"
      text-size="text-32"
      :text="`${$t('createEvent.new_present')}`"
      text-color="text-violet-color"
      text-position="text-center"
    />

    <form autocomplete="off" @submit.prevent="validateForm('presentData')">
      <div class="form-base form-label form-css-label">
        <fieldset
          :class="{ 'error-style': errors.has('presentName'), 'not-empty': presentData.presentName.length !== 0 }"
          class="form-label-group"
        >
          <input
            id="nameInput"
            v-model="presentData.presentName"
            v-validate="'required'"
            type="text"
            name="presentName"
          />
          <label for="nameInput">{{ $t('createEvent.present_name') }} *</label>
          <span class="error-message">{{ errors.first('presentName') }}</span>
        </fieldset>

        <fieldset
          :class="{ 'error-style': errors.has('presentLink'), 'not-empty': presentData.presentLink.length !== 0 }"
          class="form-label-group"
        >
          <input
            id="linkInput"
            v-model="presentData.presentLink"
            v-validate="'required|url: {require_protocol: true }'"
            type="text"
            name="presentLink"
          />
          <label for="linkInput">{{ $t('createEvent.present_link') }}</label>
          <span class="error-message">{{ errors.first('present_link') }}</span>
        </fieldset>

        <fieldset
          :class="{
            'error-style': errors.has('presentDescription'),
            'not-empty': presentData.presentDescription.length !== 0,
          }"
          class="form-label-group"
        >
          <input
            id="descriptionInput"
            v-model="presentData.presentDescription"
            v-validate="'required'"
            type="text"
            name="presentDescription"
          />
          <label for="descriptionInput">{{ $t('createEvent.present_description') }}</label>
          <span class="error-message">{{ errors.first('presentDescription') }}</span>
        </fieldset>

        <molecule-image-upload
          :image-url="presentData.image"
          name="presentImage"
          @uploadImage="uploadImage"
          @changeImage="changeImage"
        />

        <button type="submit" class="v-btn-wide">{{ $t('createEvent.add_present') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';
import AtomTitle from '@/components/atoms/AtomTitle';
import MoleculeImageUpload from '@/components/molecules/MoleculeImageUpload';

export default {
  name: 'OrganismGiftForm',
  components: {
    AtomTitle,
    MoleculeImageUpload,
  },
  props: {
    isGiftModalShown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      presentData: {
        presentName: '',
        presentLink: '',
        presentDescription: '',
        image: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      currentEvent: getterTypes.CURRENT_EVENT,
      currentEventPresentImage: getterTypes.CURRENT_EVENT_PRESENT_IMAGE,
    }),
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
    validateForm(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.addGift();
        }
      });
    },
    addGift() {
      const presentData = {
        event_id: this.currentEvent.id,
        name: this.presentData.presentName,
        description: this.presentData.presentDescription,
        link: this.presentData.presentLink,
        images: [this.presentData.image],
      };

      this.$store.dispatch(actionTypes.ADD_ANNIVERSARY_PRESENT, presentData).then(response => {
        this.$snotify.success(response);
        this.$emit('close-parent-modal');
        this.resetNewPresentForm();
      });
    },
    resetNewPresentForm() {
      this.presentData = {
        presentName: '',
        presentLink: '',
        presentDescription: '',
        image: '',
      };
    },
  },
};
</script>

<style scoped></style>
