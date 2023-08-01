<template>
  <div>
    <atom-title
      tag="h1"
      text-size="text-32"
      font-family="font-source-bold"
      :text="$t('events.acceptInvitation')"
      text-position="text-center"
    />
    <div class="text-center content">
      <atom-text class="mt-12" :text="$t('events.partyName')" text-size="text-16" />
      <atom-text :text="currentEvent?.name" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text class="mt-12" :text="$t('events.partyHost')" text-size="text-16" />
      <atom-text :text="currentEvent?.user?.name" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text class="mt-12" :text="$t('events.date')" text-size="text-16" />
      <atom-text :text="currentEvent?.datetime" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text class="mt-12" :text="$t('events.place')" text-size="text-16" />
      <atom-text :text="currentEvent?.location" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text v-if="currentEvent?.description" class="mt-12" :text="$t('events.description')" text-size="text-16" />
    </div>
    <molecule-show-more-texts v-if="currentEvent?.description" :paragraph="description" />

    <div class="event-popup-footer mt-20">
      <atom-link
        class="btn-small"
        tag="button"
        text-size="text-14"
        background="bg-white"
        font-family="font-source-regular"
        button-position="float-right"
        @click.native="answerInvitation(2)"
        >{{ $t('events.decline') }}</atom-link>

      <atom-link
        class="btn-small ml-15"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        background="btn-gradient-color"
        font-family="font-source-bold"
        button-position="float-right"
        @click.native="answerInvitation(1)"
        >{{ $t('events.accept') }}</atom-link>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';
import AtomTitle from '../atoms/AtomTitle';
import AtomText from '../atoms/AtomText';
import AtomLink from '../atoms/AtomLink';

export default {
  components: {
    AtomTitle,
    AtomText,
    AtomLink,
    MoleculeShowMoreTexts: () => import('../molecules/MoleculeShowMoreTexts'),
  },
  props: ['guestId'],
  computed: {
    ...mapGetters({
      currentEvent: getterTypes.CURRENT_EVENT,
    }),
    description() {
      return {
        subTitle: this.$t('events.description'),
        text: this.currentEvent.description,
      };
    },
  },
  methods: {
    answerInvitation(accepted) {
      const payload = {
        accepted,
        guest_id: this.guestId,
      };
      this.$store
        .dispatch(actionTypes.ANSWER_INVITATION, payload)
        .then(message => {
          this.$emit('close');
          this.$snotify.success(message);
        })
        .catch(() => {
          this.$snotify.error('error');
        });
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismInvitedEventPopup.scss';
</style>
