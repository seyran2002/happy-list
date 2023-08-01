<template>
  <div class="hg-event-created-modal-body">
    <lazy-load-image
      class="icon-content text-center hg-event-success-created-img"
      :src="require(`@/assets/images/svg/congratulation-img.svg`)"
      width="109"
      height="109"
    />

    <atom-title
      class="text-center event-success-created-title"
      :text="$t('createEvent.event_success_created')"
      font-family="font-source-bold"
      text-size="text-32"
      tag="h1"
    />

    <atom-text
      v-if="eventType === 'anniversary'"
      class="text-center event-success-created-description"
      :text="$t('createEvent.event_success_created_msg')"
    />
    <atom-text
      v-else
      class="text-center event-success-created-description"
      :text="$t('createEvent.ss_success_created_msg')"
    />

    <atom-invite-link
      v-if="inviteUrl"
      id="inviteLink"
      name="invite_link"
      text-size="text-11"
      border-radius="border-radius-10"
      :input-icons="inputIcons"
      input-icons-position="append-icons-right"
      :value="inviteUrl"
    />

    <atom-button
      class="btn border-default-color border-default-radius hg-full-width hg-confirm-without-invite"
      background="btn-default"
      text-color="text-white-color"
      font-family="font-source-semiBold"
      text-size="text-14"
      @click.native="updateEventStatus"
    >
      {{ $t('createEvent.confirm') }},
      <atom-text class="hg-btn-title-description" text-size="text-12" :text="$t('createEvent.not_send_invitations')" />
    </atom-button>

    <molecule-new-event-btns :is-show-back="true" :is-next-content="true" @next="next" @back="back()">
      <template v-slot:nextContent>
        {{ $t('createEvent.confirm') }},
        <atom-text
          v-if="eventType === 'anniversary'"
          class="hg-btn-title-description"
          text-size="text-12"
          text-color="text-white-color"
          :text="$t('createEvent.and_send_invitations')"
        />
        <atom-text
          v-else
          class="hg-btn-title-description"
          text-size="text-12"
          text-color="text-white-color"
          :text="$t('createEvent.and_invite_members')"
        />
      </template>
    </molecule-new-event-btns>
  </div>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomText from '@/components/atoms/AtomText';
import AtomInviteLink from '@/components/atoms/AtomInviteLink';
import AtomButton from '@/components/atoms/AtomButton';
import MoleculeNewEventBtns from '@/components/molecules/MoleculeNewEventBtns';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismEventCreatedSuccess',
  components: {
    AtomTitle,
    AtomText,
    AtomInviteLink,
    AtomButton,
    MoleculeNewEventBtns,
  },
  props: {
    inviteUrl: {
      type: String,
      required: false,
    },
    eventId: {
      type: Number,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputIcons: [
        {
          iconName: 'info-icon',
          title: this.$t('createEvent.invite_link_info'),
          clickEvent: '',
        },
        {
          iconName: 'copy-icon',
          title: this.$t('createEvent.copy'),
          clickEvent: 'copyInviteUrl',
        },
      ],
    };
  },
  methods: {
    updateEventStatus() {
      const updateEventAction =
        this.eventType === 'anniversary' ? actionTypes.UPDATE_ANNIVERSARY_EVENT : actionTypes.UPDATE_SS_EVENT;
      this.$store.dispatch(updateEventAction, { payload: { saved: 1 }, eventID: this.eventId }).then(() => {
        this.$snotify.success(this.$t('createEvent.invite_updated', { name: this.eventName }));
        this.$emit('finish');
      });
    },
    next() {
      const inviteGuestsAction =
        this.eventType === 'anniversary' ? actionTypes.INVITE_ANNIVERSARY_GUESTS : actionTypes.INVITE_SS_GUESTS;
      this.$store
        .dispatch(inviteGuestsAction, this.eventId)
        .then(() => {
          this.$snotify.success(this.$t('createEvent.invite_updated', { name: this.eventName }));
          this.$emit('finish');
        })
        .catch(err => {
          if (err && err.message) {
            this.$snotify.error(err.message);
          }
        });
    },
    back() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismEventCreatedSuccess.scss';
</style>
