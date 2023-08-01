<template>
  <div class="profile-main-data">
    <molecule-breadcrumbs :links="breadcrumbsLinks" />

    <atom-title :text="title" text-size="text-32" tag="h1" />

    <molecule-upload-image class="upload-image-block" :user-data="userData" @avatar="e => $emit('avatar', e)" />

    <molecule-from
      translationWord="profile"
      :inputs="formInputs"
      :date-picker="formDate"
      @submit-profile="$emit('submit-profile')"
      @dateValueChange="e => $emit('dateValueChange', e)"
      @changeInputVal="(n, v) => $emit('changeInputVal', n, v)"
    />
  </div>
</template>

<script>
import AtomButton from '@/components/atoms/AtomButton';
import AtomTitle from '../atoms/AtomTitle';
import MoleculeBreadcrumbs from '../molecules/MoleculeBreadcrumbs';
import MoleculeFrom from '../molecules/MoleculeFrom';
import MoleculeUploadImage from '../molecules/MoleculeUploadImage';

export default {
  components: {
    AtomTitle,
    AtomButton,
    MoleculeUploadImage,
    MoleculeBreadcrumbs,
    MoleculeFrom,
  },
  props: {
    title: {
      type: String,
    },
    breadcrumbsLinks: {
      type: Array,
    },
    formInputs: {
      type: Array,
      required: true,
    },
    formDate: {
      type: Object,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismProfileData';
</style>
