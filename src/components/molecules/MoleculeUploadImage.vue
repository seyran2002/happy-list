<template>
  <div>
    <div class="avatar-main-block">
      <atom-avatar size="62" :image-url="userData.avatar" :title="userData.name" />
      <atom-link
        tag="button"
        text-size="text-12"
        text-color="text-white-color"
        font-family="font-source-bold"
        background="btn-gradient-color"
        class="btn-small"
        @click="show = true"
      >
        {{ $t('profile.uploadImageBtn') }}
      </atom-link>
    </div>

    <my-upload
      v-show="show"
      ref="me"
      v-model="show"
      field="avatar"
      :width="200"
      :height="200"
      :lang-ext="$t('profile.uploadImage')"
      :noSquare="true"
      img-format="png"
      @crop-success="uploadImage"
    >
    </my-upload>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload';
import AtomLink from '../atoms/AtomLink';
import AtomAvatar from '../atoms/AtomAvatar';

export default {
  components: {
    myUpload,
    AtomLink,
    AtomAvatar,
  },
  props: {
    userData: {
      type: Object,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    uploadImage(imgDataUrl) {
      let imgData = imgDataUrl;
      const img = document.getElementsByClassName('vicp-img')[0].src;
      if (img.split(';')[0].endsWith('gif')) {
        imgData = img;
      }
      const formData = new FormData();
      formData.append('images[]', imgData);
      this.$emit('avatar', formData);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeUploadImage';
</style>
