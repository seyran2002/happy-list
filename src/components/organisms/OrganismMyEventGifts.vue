<template>
  <section class="event-content-gifts">
    <div class="d-flex items-center justify-space-between">
      <atom-title class="pl-14" :text="$t('faq.Presents')" text-size="text-16" font-family="font-source-regular" />

      <button
        v-if="!isInvitedEvent && isBeforeEventDate"
        class="event-content-add-gift-btn"
        @click="toggleNewGiftModal"
      >
        <img :src="require('@/assets/images/svg/plus.svg')" alt="" width="10" height="10" />
      </button>
    </div>

    <ul ref="giftsList" class="gifts-list" :style="{ maxHeight: giftsListMaxHeight }">
      <molecule-my-event-gift
        v-for="(gift, index) in currentEventGiftsFiltered"
        :key="gift.id"
        :class="{ blinking: invitedPresents.includes(gift.id) }"
        :item-index="index"
        :gift="gift"
        @show-gift-popup="showGiftPopup"
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

    <organism-modal v-show="isNewGiftModalShown" class="base-modal" @close="toggleNewGiftModal">
      <template v-slot:body>
        <organism-gift-form :is-modal-opened="isNewGiftModalShown" @close-parent-modal="toggleNewGiftModal" />
      </template>
    </organism-modal>

    <organism-modal
      v-show="isGiftPopupShown && !isGiftSharePopupShown"
      class="base-modal gift-modal"
      @close="toggleGiftPopup"
    >
      <template v-slot:body>
        <organism-gift-popup-content v-if="giftToEdit" :current-gift-initial="giftToEdit" />
      </template>
    </organism-modal>

    <organism-modal v-if="isGiftSharePopupShown" class="base-modal hg-share-gift-modal" @close="toggleGiftSharePopup">
      <template v-slot:header>
        <atom-title
          tag="h2"
          text-size="text-22"
          :text="$t('common.sharePresentTitle')"
          text-color="text-violet-color"
          text-position="text-center"
        />
      </template>

      <template v-slot:body>
        <organism-guests-list
          v-if="currentEventGuestsLargeList.length"
          :all-guests-count="currentEventGuestsLargeList.length"
          :guests-list="currentEventGuestsLargeList"
          event-type="anniversary"
          :event-id="eventID"
          :is-selection-list="true"
        />

        <div v-else class="hg-empty-guests-content">
          {{ $t('common.unavailableGuests') }}
        </div>
      </template>

      <template v-slot:footer>
        <atom-button
          v-if="currentEventGuestsLargeList.length"
          class="btn gift-popup-btn gift-popup-gradient-btn"
          :background="'btn-gradient-color'"
          text-color="text-white-color"
          @click.native="shareGiftWithGuests"
        >
          {{ $t('common.share') }}
        </atom-button>
      </template>
    </organism-modal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import filterGuestsGiftsInject from '@/mixins/filter-guests-gifts-inject';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomLink from '@/components/atoms/AtomLink';
import AtomButton from '@/components/atoms/AtomButton';
import AtomDynamicTag from '@/components/atoms/AtomDynamicTag';
import MoleculeMyEventGift from '@/components/molecules/MoleculeMyEventGift';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismMyEventGifts',
  mixins: [filterGuestsGiftsInject],
  components: {
    AtomTitle,
    AtomLink,
    AtomButton,
    AtomDynamicTag,
    MoleculeMyEventGift,
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismGiftForm: () => import('@/components/organisms/OrganismGiftForm'),
    OrganismGiftPopupContent: () => import('@/components/organisms/OrganismGiftPopupContent'),
    OrganismGuestsList: () => import('@/components/organisms/OrganismGuestsList'),
  },
  data() {
    return {
      isNewGiftModalShown: false,
      isGiftPopupShown: false,
      giftToEdit: null,
      giftToEditIndex: null,
      giftsListMaxHeight: 'none',
      isGiftSharePopupShown: false,
      selectedGuests: false,
    };
  },
  computed: {
    ...mapGetters({
      currentEvent: getterTypes.CURRENT_EVENT,
      currentEventGifts: getterTypes.CURRENT_EVENT_PRESENTS,
      get_currentEventGuests: getterTypes.CURRENT_EVENT_GUESTS,
      userProfile: getterTypes.USER_DATA,
      invitedPresents: getterTypes.MY_INVITED_PRESENTS_LIST,
    }),
    eventID() {
      return this.currentEvent.id;
    },
    currentEventGuests() {
      return JSON.parse(JSON.stringify(this.get_currentEventGuests));
    },
    currentEventGuestsIds() {
      return this.currentEventGifts[this.giftToEditIndex].guests.map(guest => guest.id);
    },
    currentEventGuestsLargeList() {
      return this.currentEventGuests.filter(
        event => event.user.id !== this.userProfile.id && !this.currentEventGuestsIds.includes(event.id)
      );
    },
    isInvitedEvent() {
      return ['EventsInvited', 'EventInvited'].includes(this.$route.name);
    },
    isBeforeEventDate() {
      return new Date().getTime() < new Date(this.currentEvent.datetime).getTime();
    },
    parentRoute() {
      const eventsTypes = {
        EventSecretSanta: { path: 'EventsSecretSanta', text: this.$t('events.allSSEvents') },
        EventAnniversary: { path: 'EventsAnniversary', text: this.$t('events.allAnniversary') },
        EventInvited: { path: 'EventsInvited', text: this.$t('events.allInvited') },
      };

      return eventsTypes[this.$route.name];
    },
    currentEventGiftsFiltered() {
      if (this.filterStr === '' || this.filterBy !== 'gifts') {
        return this.currentEventGifts;
      }

      return this.currentEventGifts.filter(gift => gift.name.toLowerCase().includes(this.filterStr.toLowerCase()));
    },
  },
  created() {
    this.$eventHub.$on('show-gift-share-popup', this.toggleGiftSharePopup);
    this.$eventHub.$on('share-gift-guests-popup', this.setGuests);
  },
  mounted() {
    const contentGifts = document.querySelector('.event-content-gifts');
    const contentGiftsHeader = contentGifts.querySelector('h2');

    const resizeObs = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      const { bottom } = rect;
      this.giftsListMaxHeight = `${bottom - contentGiftsHeader.offsetHeight}px`;
    });

    resizeObs.observe(document.querySelector('.event-content-gifts'));

    this.$once('hook:beforeDestroy', () => {
      resizeObs.disconnect();
    });
  },
  methods: {
    toggleNewGiftModal() {
      this.isNewGiftModalShown = !this.isNewGiftModalShown;
      document.body.classList.toggle('modal-open');
    },
    toggleGiftPopup() {
      this.isGiftPopupShown = !this.isGiftPopupShown;
      document.body.classList.toggle('modal-open');
    },
    showGiftPopup(giftId, giftIndex) {
      this.giftToEditIndex = giftIndex;
      this.giftToEdit = giftId;
      this.toggleGiftPopup();
    },
    toggleGiftSharePopup() {
      this.isGiftSharePopupShown = !this.isGiftSharePopupShown;
      document.body.classList.toggle('modal-open');
    },
    shareGiftWithGuests() {
      this.$store
        .dispatch(actionTypes.SHARE_ANNIVERSARY_PRESENT, {
          presentID: this.giftToEdit,
          guestsData: { guest_id: this.selectedGuests },
        })
        .then(() => {
          this.$eventHub.$emit('re-receive-chosen-gift');
          this.$snotify.success(this.$t('common.shareSuccess'), '', {
            timeout: -1,
            showProgressBar: true,
          });
        })
        .catch(error => console.error(error));
    },
    setGuests(guests) {
      this.selectedGuests = guests;
    },
  },
  provide() {
    return {
      isGiftPopupShown: () => this.isGiftPopupShown,
    };
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismMyEventGifts.scss';
</style>
