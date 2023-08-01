<template>
  <div class="event-types">
    <molecule-event-item
      v-for="(item, key) in eventTypes"
      :ref="`event-type-${key}`"
      :key="`event-type-${key}`"
      :item-description="item.description"
      :item-icon-name="item.iconName"
      :item-btn-txt="item.btnTxt"
      :item-help-tag="item.helpTag"
      :item-path="item.path"
    />
  </div>
</template>

<script>
import MoleculeEventItem from '@/components/molecules/MoleculeEventItem';

export default {
  name: 'OrganismCreateEvent',
  components: {
    MoleculeEventItem,
  },
  computed: {
    eventTypes() {
      return [
        {
          path: 'secret-santa',
          helpTag: 'rulesOfSSEvent',
          iconName: 'sleighGift',
          btnTxt: this.$i18n.t('createEvent.secret_santa_btn_txt'),
          description: this.$i18n.t('createEvent.secret_santa_description'),
        },
        {
          path: 'anniversary',
          helpTag: 'createAnniversaryEvent',
          iconName: 'happyPerson',
          btnTxt: this.$i18n.t('createEvent.anniversary_btn_txt'),
          description: this.$i18n.t('createEvent.anniversary_description'),
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismCreateEvent.scss';
</style>
