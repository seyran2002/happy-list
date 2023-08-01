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
      <atom-text :text="invitedEvent?.name" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text class="mt-12" :text="$t('events.partyHost')" text-size="text-16" />
      <atom-text :text="invitedEvent?.user?.name" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text class="mt-12" :text="$t('events.date')" text-size="text-16" />
      <atom-text :text="invitedEvent?.datetime" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text class="mt-12" :text="$t('events.place')" text-size="text-16" />
      <atom-text class="mt-12" :text="invitedEvent?.location" text-size="text-16" font-family="font-source-semiBold" />

      <atom-text v-if="invitedEvent?.description" class="mt-12" :text="$t('events.description')" text-size="text-16" />
    </div>
    <molecule-show-more-texts v-if="invitedEvent?.description" class="mt-12" :paragraph="description" />

    <div class="event-popup-footer mt-20">
      <atom-link
        class="btn-small ml-15"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        background="btn-gradient-color"
        font-family="font-source-bold"
        button-position="float-right"
        @click.native="accept"
        >{{ $t('events.accept') }}</atom-link>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import AtomTitle from '../atoms/AtomTitle';
import AtomLink from '../atoms/AtomLink';
import AtomText from '../atoms/AtomText';
import actionTypes from '../../store/types/action-types';

export default {
  components: {
    AtomTitle,
    AtomText,
    AtomLink,
    MoleculeShowMoreTexts: () => import('../molecules/MoleculeShowMoreTexts'),
  },
  props: {
    invitedEvent: {
      type: Object,
      required: true,
    },
  },
  computed: {
    description() {
      return {
        text: this.invitedEvent.description,
      };
    },
  },
  methods: {
    accept() {
      this.$store
        .dispatch(actionTypes.ACCEPT_INVITATION_TOKEN, localStorage.getItem('event_token'))
        .then(() => {
          this.$store.dispatch(actionTypes.GET_MY_INVITED_EVENTS);
          this.$emit('close');
          this.$router.push(`/events/invited/${this.invitedEvent.id}`);
        })
        .catch(error => {
          this.$snotify.clear();
          this.$snotify.error(`${error.message} 😕`, '', {
            timeout: -1,
            showProgressBar: true,
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismInvitedEventPopup.scss';
</style>
