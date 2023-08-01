<template>
  <article class="gift-popup-content">
    <header class="gift-popup-header">
      <atom-title tag="h3" :text="$t('events.present')" text-size="text-18" font-family="font-source-bold" />

      <atom-toggle :default-state="!sight" :disabled="!isHost && !isChosenByMe" @change-toggle-val="updateGiftSight">
        <atom-text :text="sight ? $t('events.hidePresent') : $t('events.showPresent')" text-size="text-12" />
      </atom-toggle>
    </header>

    <main class="gift-popup-main">
      <div v-if="currentEventGifts.length > 1" ref="swiper" class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <div v-for="gift in currentEventGifts" :key="gift.id" class="gift-popup-image-wrapper swiper-slide">
            <div v-if="gift.image" class="blur" :style="{ backgroundImage: `url('${gift.image}')` }"></div>
            <img class="gift-popup-image" :src="gift.image || require('@/assets/images/svg/gift.svg')" alt="" />
          </div>
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>

      <div v-else class="gift-popup-image-wrapper">
        <img class="gift-popup-image" :src="gift.image || require('@/assets/images/svg/gift.svg')" alt="" />
      </div>

      <atom-title
        class="gift-popup-title mb-14"
        text-size="text-24"
        font-family="font-source-bold"
        :text="currentGift?.name"
      />

      <go-to-url v-if="currentGift?.link" :url="currentGift?.link" target="_blank" class="mb-14">
        <atom-text class="pointer" tag="span" :text="$t('events.checkLink')" text-color="text-violet-color" />
      </go-to-url>

      <atom-text v-if="currentGift?.description" class="mb-36" :text="currentGift?.description" />

      <ul v-if="currentGift?.guests.length && giftGuests.length" class="guests-list">
        <molecule-my-event-guest
          v-for="guest in giftGuests"
          :key="guest.id"
          :ref="`event-item-guest-${guest.id}`"
          :guest="guest"
          :is-present-guests="true"
        />
      </ul>

      <ul v-else-if="currentGift?.guests.length" class="guests-list">
        <molecule-my-event-guest
          :key="`incognito_${currentGift.id}`"
          :ref="`event-item-guest-${currentGift.id}-incognito`"
          :guest="incognitoData"
          :is-present-guests="true"
          :is-incognito-guest="true"
        />
      </ul>

      <template v-if="isHost">
        <atom-button
          class="btn gift-popup-btn gift-popup-white-btn"
          :background="'btn-gradient-color'"
          text-color="text-main-color"
          @click.native="confirmRemoveGift()"
        >
          {{ $t('common.delete') }}
        </atom-button>
      </template>

      <template v-else-if="isChosenByMe">
        <atom-button
          class="gift-popup-btn btn"
          :background="'btn-gradient-color'"
          text-color="text-main-color"
          @click.native="chooseGift"
        >
          {{ $t('common.cancel') }}
        </atom-button>

        <atom-button
          class="btn gift-popup-btn gift-popup-gradient-btn"
          :background="'btn-gradient-color'"
          text-color="text-white-color"
          @click.native="shareGift"
        >
          {{ $t('common.share') }}
        </atom-button>
      </template>

      <template v-else-if="isInvitedShareGift">
        <atom-button
          class="gift-popup-btn btn"
          :background="'btn-gradient-color'"
          text-color="text-main-color"
          @click.native="answerGiftInvitation(false)"
        >
          {{ $t('common.decline') }}
        </atom-button>

        <atom-button
          class="btn gift-popup-btn gift-popup-gradient-btn"
          :background="'btn-gradient-color'"
          text-color="text-white-color"
          @click.native="answerGiftInvitation(true)"
        >
          {{ $t('common.accept') }}
        </atom-button>
      </template>

      <template v-else-if="!isChosen">
        <atom-button
          class="gift-popup-btn btn"
          :background="'btn-gradient-color'"
          text-color="text-main-color"
          @click.native="chooseGift"
        >
          {{ $t('common.choose') }}
        </atom-button>
      </template>
    </main>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import actionTypes from '@/store/types/action-types';
import getterTypes from '@/store/types/getter-types';
// eslint-disable-next-line import/no-unresolved
import Swiper, { Navigation } from 'swiper';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomText from '@/components/atoms/AtomText';
import AtomToggle from '@/components/atoms/AtomToggle';
import AtomButton from '@/components/atoms/AtomButton';
import MoleculeMyEventGuest from '@/components/molecules/MoleculeMyEventGuest';
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.min.css';

export default {
  name: 'OrganismGiftEdit',
  props: {
    currentGiftInitial: {
      type: Number,
      default: null,
    },
  },
  components: {
    AtomTitle,
    AtomText,
    AtomToggle,
    AtomButton,
    MoleculeMyEventGuest,
  },
  inject: {
    isGiftPopupShown: { default: true },
  },
  data() {
    return {
      gift: this.currentGiftInitial,
      incognitoData: {
        name: 'Incognito',
        avatar: require('@/assets/images/svg/icon-question.svg'),
      },
    };
  },
  computed: {
    ...mapGetters({
      userData: getterTypes.USER_DATA,
      currentEvent: getterTypes.CURRENT_EVENT,
      currentEventGifts: getterTypes.CURRENT_EVENT_PRESENTS,
      userProfile: getterTypes.USER_DATA,
    }),
    isGiftPopup() {
      return this.isGiftPopupShown();
    },
    sight() {
      return this.userProfile.id === this.currentGift?.owner_id
        ? this.currentGift?.host_sight
        : this.currentGift?.guest_sight;
    },
    currentGift: {
      get() {
        return this.currentEventGifts.find(gift => gift.id === this.gift);
      },
      set(val) {
        this.gift = val;
      },
    },
    initialSlide() {
      return this.currentEventGifts.length > 1 && this.currentEventGifts.findIndex(gift => gift.id === this.gift);
    },
    isHost() {
      return this.currentEvent.user_id === this.userData.id;
    },
    isChosenByMe() {
      return this.currentGift?.guests.some(
        guest => guest.user_id === this.userProfile.id && guest?.pivot?.accepted === 1
      );
    },
    isInvitedShareGift() {
      return this.currentGift?.guests.some(
        guest => guest.user_id === this.userProfile.id && guest?.pivot?.accepted === 0
      );
    },
    isChosen() {
      return this.currentGift?.guests.length;
    },
    currentEventGuestsIds() {
      return this.currentGift.guests.map(guest => guest.id);
    },
    currentEventUsersIds() {
      return this.currentGift.guests.map(guest => guest.user_id);
    },
    giftGuests() {
      if (this.currentEventUsersIds.includes(this.userProfile.id)) {
        return this.currentGift?.guests;
      }

      return this.currentGift?.guests.filter(guest => guest?.pivot?.accepted === 1);
    },
  },
  watch: {
    currentGiftInitial(val) {
      this.gift = val;
      this.initSwiper();
    },
  },
  created() {
    this.$eventHub.$on('re-receive-chosen-gift', this.getPresents);
  },
  mounted() {
    // eslint-disable-next-line no-new
    if (this.$refs.swiper) {
      this.initSwiper();
    }
  },
  methods: {
    initSwiper() {
      // eslint-disable-next-line no-underscore-dangle
      const _this = this;

      // eslint-disable-next-line no-new
      new Swiper(this.$refs.swiper, {
        modules: [Navigation],
        loop: true,
        initialSlide: this.initialSlide,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        spaceBetween: 12,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange(swiper) {
            _this.setCurrentGift(_this.currentEventGifts[swiper.realIndex].id);
          },
        },
      });
    },
    updateGiftSight(sight) {
      const payload =
        this.userProfile.id === this.currentGift.owner_id ? { host_sight: !sight } : { guest_sight: !sight };
      this.$store
        .dispatch(actionTypes.UPDATE_ANNIVERSARY_PRESENT_SIGHT, {
          presentID: this.currentGift.id,
          payload,
        })
        .then(() => {
          this.$snotify.success(this.$t('events.giftUpdatedSuccessfully'), '', {
            timeout: -1,
            showProgressBar: true,
          });
        })
        .catch(error => console.error(error));
    },
    confirmRemoveGift() {
      const msg = this.$t('createEvent.delete_present_confirmation_msg', { name: this.currentGift.name });
      this.$snotify.confirm(msg, '', {
        timeout: -1,
        buttons: [
          {
            text: this.$t('createEvent.delete'),
            action: toast => {
              this.deleteGift(this.currentGift.id);
              this.$snotify.remove(toast.id);
            },
            bold: true,
          },
          {
            text: this.$t('createEvent.keep'),
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: false,
          },
        ],
      });
    },
    deleteGift(id) {
      this.$store
        .dispatch(actionTypes.DELETE_ANNIVERSARY_PRESENT_BY_ID, {
          presentID: id,
          eventID: this.currentEvent.id,
        })
        .then(() => {
          this.$snotify.success(this.$t('events.giftDeletedSuccessfully'), '', {
            timeout: -1,
            showProgressBar: true,
          });
        })
        .catch(error => console.error(error));
    },
    getPresents() {
      this.$store.dispatch(actionTypes.GET_ANNIVERSARY_PRESENTS, this.currentEvent.id);
    },
    chooseGift() {
      const { id } = this.currentGift;
      this.$store
        .dispatch(actionTypes.CHOOSE_ANNIVERSARY_PRESENT, {
          presentID: id,
          eventID: this.currentEvent.id,
        })
        .then(response => {
          if (response.success) {
            this.getPresents();
            this.$snotify.info(`${response.message} 🎁`, '', {
              timeout: -1,
              showProgressBar: true,
            });
          } else {
            this.$snotify.error(this.$t('events.tryAgain'), '', {
              timeout: -1,
              showProgressBar: true,
            });
          }
        })
        .catch(e => console.error(e));
    },
    answerGiftInvitation(status) {
      this.$store
        .dispatch(actionTypes.ACCEPT_ANNIVERSARY_PRESENT, { presentID: this.currentGift.id, actionStatus: status })
        .then(response => {
          this.getPresents();
          if (response.message) {
            this.$snotify.info(`${response.message} 🎁`, '', {
              timeout: -1,
              showProgressBar: true,
            });
          } else {
            this.$snotify.error(this.$t('events.tryAgain'), '', {
              timeout: -1,
              showProgressBar: true,
            });
          }
        })
        .catch(e => console.error(e));
    },
    shareGift() {
      this.$eventHub.$emit('show-gift-share-popup');
    },
    setCurrentGift(slide) {
      this.currentGift = slide;
    },
  },
  destroyed() {
    this.currentGift = null;
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismGiftPopupContent.scss';
</style>
