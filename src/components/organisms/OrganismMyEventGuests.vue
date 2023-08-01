<template>
  <section class="event-content-guests">
    <header class="event-content-header">
      <div class="d-flex items-center gap-12 mb-8">
        <p
          v-if="isSecretSanta && currentEvent.saved === 2"
          class="event-content-subtitle"
          @click="showGiftee(currentEvent.id)"
        >
          {{ this.$t('events.whomDoWeGive') }}
        </p>
      </div>
      <atom-title
        class="mb-12"
        text-size="text-16"
        font-family="font-source-semiBold"
        text-position="text-left"
        :text="currentEvent?.name"
      />

      <div class="event-content-time-place">
        <div>
          <p class="subtitle">{{ $t('common.day') }}</p>
          <p class="text-16 font-source-semiBold">{{ eventDate }}</p>
        </div>

        <div>
          <p class="subtitle">{{ $t('common.time') }}</p>
          <p class="text-16 font-source-semiBold">{{ eventTime }}</p>
        </div>

        <div>
          <p class="subtitle">{{ $t('common.place') }}</p>
          <p class="text-16 font-source-semiBold">{{ currentEvent?.location }}</p>
        </div>
      </div>

      <atom-toggle
        v-if="isInvitedEvent"
        class="mt-20"
        :default-state="myVisibility"
        :disabled="!isBeforeEventDate"
        @change-toggle-val="updateGuestSight"
      >
        <atom-text :text="$t('events.sightForGuests')" text-size="text-14" />
      </atom-toggle>

      <atom-invite-link
        v-if="currentEvent?.invite_url && isBeforeEventDate"
        id="inviteLink"
        class="mt-20"
        name="invite_link"
        text-size="text-11"
        border-radius="border-radius-10"
        :input-icons="inputIcons"
        input-icons-position="append-icons-right"
        :value="currentEvent?.invite_url"
      />
    </header>

    <div class="d-flex items-center justify-space-between">
      <atom-title :text="$t('faq.Guests')" text-size="text-16" font-family="font-source-regular" />

      <button
        v-if="!isSecretSanta && !isInvitedEvent && isBeforeEventDate"
        class="event-content-add-guest-btn"
        @click="toggleModal"
      >
        <img :src="require('@/assets/images/svg/plus.svg')" alt="" width="10" height="10" />
      </button>

      <button
        v-else-if="isSecretSanta && !isInvitedEvent && isBeforeEventDate && currentEvent.saved === 1"
        class="event-content-add-guest-btn"
        @click="toggleModal"
      >
        <img :src="require('@/assets/images/svg/plus.svg')" alt="" width="10" height="10" />
      </button>
    </div>

    <div class="hg-send-invitations-btn-content">
      <atom-link
        v-if="isSecretSanta && !isInvitedEvent && isBeforeEventDate && currentEvent.saved === 1"
        class="btn btn-small hg-send-invitations-btn"
        text-color="text-white-color"
        tag="button"
        text-size="text-12"
        background="btn-gradient-color"
        font-family="font-source-bold"
        button-position="float-center"
        @click.native="sendInvitations"
        >{{ $t('events.sendInvitations') }}
      </atom-link>
    </div>

    <ul class="guests-list">
      <molecule-my-event-guest
        v-for="guest in currentEventGuestsFiltered"
        :key="guest.id"
        :ref="`event-item-guest-${guest.id}`"
        :guest="guest"
        @close-all-dropdowns="closeAllDropdowns"
      />
    </ul>

    <atom-link
      text-size="text-12"
      text-color="text-main-color"
      background="bg-white"
      class="btn-white guests-go-back-btn"
      tag="router-link"
      font-family="font-source-bold"
      :to="{ name: parentRoute.path }"
    >
      {{ parentRoute.text }}
    </atom-link>

    <organism-modal v-if="isModalShown" class="base-modal" @close="toggleModal">
      <template v-slot:body>
        <organism-guest-form
          :is-modal-opened="isModalShown"
          :event-type="eventType"
          @close-parent-modal="toggleModal"
        />
      </template>
    </organism-modal>

    <vue-snotify />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import actionTypes from '@/store/types/action-types';
import getterTypes from '@/store/types/getter-types';
import filterGuestsGiftsInject from '@/mixins/filter-guests-gifts-inject';
import closeAllDropdowns from '@/mixins/close-all-dropdowns';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomText from '@/components/atoms/AtomText';
import AtomLink from '@/components/atoms/AtomLink';
import AtomToggle from '@/components/atoms/AtomToggle';
import AtomTooltip from '@/components/atoms/AtomTooltip';
import AtomInviteLink from '@/components/atoms/AtomInviteLink';
import MoleculeMyEventGuest from '@/components/molecules/MoleculeMyEventGuest';

export default {
  name: 'OrganismMyEventGuests',
  mixins: [filterGuestsGiftsInject, closeAllDropdowns],
  components: {
    AtomTooltip,
    AtomTitle,
    AtomLink,
    AtomToggle,
    AtomInviteLink,
    AtomText,
    MoleculeMyEventGuest,
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismGuestForm: () => import('@/components/organisms/OrganismGuestForm'),
  },
  props: {
    eventType: {
      type: String,
      required: false,
      default: 'anniversary',
    },
  },
  data() {
    return {
      isModalShown: false,
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
  computed: {
    ...mapGetters({
      userProfile: getterTypes.USER_DATA,
      currentEvent: getterTypes.CURRENT_EVENT,
      currentEventGuests: getterTypes.CURRENT_EVENT_GUESTS,
      giftee: getterTypes.CURRENT_EVENT_GIFTEE,
    }),
    parentRoute() {
      const eventsTypes = {
        EventSecretSanta: { path: 'EventsSecretSanta', text: this.$t('events.allSSEvents') },
        EventAnniversary: { path: 'EventsAnniversary', text: this.$t('events.allAnniversary') },
        EventInvited: { path: 'EventsInvited', text: this.$t('events.allInvited') },
      };

      return eventsTypes[this.$route.name];
    },
    currentEventGuestsFiltered() {
      if (this.filterStr === '' || this.filterBy !== 'guests') {
        return this.currentEventGuests?.reduce((acc, guest) => {
          guest.presents = guest?.presents?.filter(p => p?.pivot_accepted === 1 || p?.name.length === 0);
          acc.push(guest);
          return acc;
        }, []);
      }

      return this.currentEventGuests
        ?.reduce((acc, guest) => {
          guest.presents = guest?.presents?.filter(p => p?.pivot_accepted === 1 || p?.name.length === 0);
          acc.push(guest);
          return acc;
        }, [])
        .filter(guest => guest.name.toLowerCase().includes(this.filterStr.toLowerCase()));
    },
    myVisibility() {
      const me =
        this.currentEventGuests && this.currentEventGuests?.find(guest => guest.user_id === this.userProfile.id);

      if (me && me.guest_sight) {
        return !!me.guest_sight;
      }
    },
    isSecretSanta() {
      return ['EventsSecretSanta', 'EventSecretSanta'].includes(this.$route.name);
    },
    isInvitedEvent() {
      return ['EventsInvited', 'EventInvited'].includes(this.$route.name);
    },
    isBeforeEventDate() {
      return (
        Object.keys(this.currentEvent).length && new Date().getTime() < new Date(this.currentEvent.datetime).getTime()
      );
    },
    eventDate() {
      if (Object.keys(this.currentEvent).length) {
        const dateStr = this.currentEvent.datetime.split(' ')[0];
        const day = new Date(dateStr).getDay();

        return `${dateStr} (${this.$t('profile.calendar.daysShort')[day]})`;
      }
    },
    eventTime() {
      if (Object.keys(this.currentEvent).length) {
        const padTo2Digits = num => String(num).padStart(2, '0');
        const date = new Date(this.currentEvent.datetime);
        return `${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`;
      }
    },
  },
  methods: {
    showGiftee(id) {
      this.$snotify.clear();

      if (this.giftee && id === this.giftee.event_id) {
        this.$snotify.info(this.giftee.name, '', {
          timeout: 1000,
          showProgressBar: true,
        });

        return;
      }

      this.$store
        .dispatch(actionTypes.GET_SS_GIFTEE, id)
        .then(() => {
          this.$snotify.info(this.giftee.name, '', {
            timeout: 1000,
            showProgressBar: true,
          });
        })
        .catch(error => {
          console.warn(error);
        });
    },
    updateGuestSight(sight) {
      const me = this.currentEventGuests.find(guest => guest.user_id === this.userProfile.id);

      this.$store
        .dispatch(actionTypes.UPDATE_GUEST_SIGHT, {
          guestID: me.id,
          payload: { guest_sight: sight },
        })
        .then(() => {
          this.$snotify.clear();

          this.$snotify.info(this.$t('events.guestUpdatedSuccessfully'), '', {
            timeout: -1,
            showProgressBar: true,
          });
        });
    },
    toggleModal() {
      this.isModalShown = !this.isModalShown;
    },
    sendInvitations() {
      this.$store
        .dispatch(actionTypes.INVITE_SS_GUESTS, this.currentEvent.id)
        .then(() => {
          this.$eventHub.$emit('get-ss-events');
          this.$snotify.clear();

          this.$snotify.info(this.$t('events.invitations_sent_success'), '', {
            timeout: -1,
            showProgressBar: true,
          });
        })
        .catch(err => {
          this.$snotify.clear();

          this.$snotify.error(err.message, '', {
            timeout: -1,
            showProgressBar: true,
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismMyEventGuests.scss';
</style>
