<template>
  <div class="add-present-img-btn-content">
    <fieldset
      :class="{
        'form-label-group': true,
        'create-event--wrapper-info-form-block---form-image-add-wrapper': true,
        'error-style': errors.has(name),
        'not-empty': image.length !== 0,
      }"
    >
      <div class="hg-image-upload-btn-content">
        <atom-link
          type="button"
          class="btn add-present-img-btn"
          background="btn-default"
          tag="button"
          font-family="font-source-regular"
          text-size="text-14"
          border-color="border-default-color"
          @click.native="imageTrigger"
          >{{ image ? $t(`createEvent.choose_other_${name}`) : $t(`createEvent.add_${name}`) }}</atom-link>

        <atom-link
          v-if="image"
          type="button"
          class="btn cancel-img-btn"
          background="btn-default"
          tag="button"
          font-family="font-source-regular"
          text-size="text-14"
          border-color="border-default-color"
          @click.native="resetImage"
          >{{ $t('createEvent.remove_img') }}</atom-link>
      </div>

      <input
        :id="`${name}Input`"
        :ref="name"
        v-validate="'image'"
        class="hg-hidden"
        type="file"
        :name="name"
        accept=".png, .jpeg, .jpg, .gif"
        @change="getBase64($event)"
      />
      <label :for="`${name}Input`" class="hg-hidden"></label>

      <span class="error-message">{{ errors.first(name) ? $t(`createEvent.${errors.first(name)}`) : '' }}</span>
      <transition v-if="image && imageLoaded" name="presentRow" tag="div">
        <div>
          <lazy-load-image class="icon-content hg-present-img" :src="image" width="48" height="56" alt="present" />
        </div>
      </transition>
    </fieldset>
  </div>
</template>

<script>
import AtomLink from '@/components/atoms/AtomLink';
import mutationTypes from '@/store/types/mutation-types';

export default {
  name: 'MoleculeImageUpload',
  components: {
    AtomLink,
  },
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      image: '',
      imageLoaded: true,
    };
  },
  mounted() {
    this.image = this.imageUrl;
  },
  methods: {
    imageTrigger() {
      this.$refs[this.name].click();
    },
    resetImage() {
      this.$refs[this.name].value = null;
      this.$store.commit(mutationTypes.SET_PRESENT_IMG, '');
      this.$emit('changeImage');
    },
    getBase64(e) {
      if (e.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        const self = this;
        reader.onload = () => {
          self.uploadImage(reader.result);
        };
        reader.onerror = error => {
          console.error('Error:', error);
        };
      }
    },
    uploadImage(imgDataUrl) {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.image = imgDataUrl;
          this.imageLoaded = false;
          this.$emit('uploadImage', imgDataUrl);
        }
      });
    },
  },
  watch: {
    imageUrl() {
      this.image = this.imageUrl;
      if (this.imageUrl) {
        this.imageLoaded = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/molecules/MoleculeImageUpload.scss';
</style>
