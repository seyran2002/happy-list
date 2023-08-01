<template>
  <li class="gifts-item-wrapper">
    <article class="gifts-item" @click="showGiftPopup">
      <div class="gifts-item-image-wrapper">
        <img class="gifts-item-image" :src="giftImage" :alt="gift.name" width="52" height="52" />

        <div class="link-icon-wrapper">
          <img
            v-if="gift.link"
            class="gifts-item-link-icon"
            width="18"
            height="18"
            :src="require(`@/assets/images/svg/link.svg`)"
            :alt="gift.link"
            :title="gift.link"
          />
        </div>
      </div>

      <div class="gifts-item-info">
        <div class="w-100 mb-4 d-flex items-center justify-space-between">
          <p class="gifts-item-name" :title="gift.name">
            {{ gift.name }}
          </p>
          <button
            v-if="isCreatedByMe && isBeforeEventDate"
            class="gifts-item-remove-btn"
            @click.stop="confirmRemoveGift(gift.name)"
          >
            <img :src="require('@/assets/images/svg/trash.svg')" alt="" />
          </button>
        </div>

        <div class="gifts-item-info-bottom" :class="gift.description ? 'justify-space-between' : ''">
          <p v-if="gift.description" class="gifts-item-description" :title="gift.description">{{ gift.description }}</p>

          <div class="w-100 d-flex items-center justify-end">
            <div v-if="gift.guests?.length" class="gifts-item-guests">
              <img
                v-for="({ avatar, name, id, guest_sight }, index) in giftGuests"
                :key="id"
                class="guests-avatar"
                :src="getGuestImage(name, avatar, guest_sight)"
                :alt="guest_sight ? name : $t('events.hiddenGuest')"
                :title="guest_sight ? name : $t('events.hiddenGuest')"
                :style="{
                  transform: `translateX(${6 * (giftGuests.length - 1 - index)}px)`,
                  zIndex: index,
                }"
                @click.stop="setupGuestsSearch(name)"
              />
            </div>

            <div v-if="gift.guests?.length > 3" class="gifts-item-guests-plus">
              +{{ gift.guests?.length - maxGuestsNum }}
            </div>
          </div>
        </div>
      </div>
    </article>

    <vue-snotify />
  </li>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';
import AtomButton from '@/components/atoms/AtomButton';
import AtomText from '@/components/atoms/AtomText';

export default {
  name: 'MoleculeMyEventGift',
  components: {
    AtomButton,
    AtomText,
  },
  props: {
    gift: {
      type: Object,
      required: true,
      default: () => {},
    },
    itemIndex: {
      type: Number,
    },
  },
  data() {
    return {
      isGiftPopupShown: false,
      maxGuestsNum: 3,
    };
  },
  computed: {
    ...mapGetters({
      userProfile: getterTypes.USER_DATA,
      currentEvent: getterTypes.CURRENT_EVENT,
    }),
    isCreatedByMe() {
      return this.userProfile.id === this.currentEvent.user_id;
    },
    isBeforeEventDate() {
      return new Date().getTime() < new Date(this.currentEvent.datetime).getTime();
    },
    giftImage() {
      if (!this.gift.image) {
        return require(`@/assets/images/svg/gift.svg`);
      }

      return this.gift.image;
    },
    giftGuests() {
      if (this.gift.guests.length > this.maxGuestsNum) {
        return this.gift.guests
          .filter(guest => guest.name.length === 0 || guest?.pivot?.accepted === 1)
          .slice(0, this.maxGuestsNum);
      }
      return this.gift.guests.filter(guest => guest.name.length === 0 || guest?.pivot?.accepted === 1);
    },
  },
  methods: {
    showGiftPopup() {
      this.$emit('show-gift-popup', this.gift.id, this.itemIndex);
    },
    getGuestImage(name, img, sight) {
      if (
        name.length === 0 ||
        (!sight && this.gift.guests.find(v => v.user_id === this.userProfile.id) === undefined)
      ) {
        return require(`@/assets/images/svg/icon-question.svg`);
      }

      if (!img) {
        return require(`@/assets/images/svg/user.svg`);
      }

      return img;
    },
    setupGuestsSearch(name) {
      this.$eventHub.$emit('setup-search', { filterBy: 'guests', filterStr: name });
    },
    confirmRemoveGift(name) {
      this.$snotify.clear();
      this.$snotify.confirm(this.$t('createEvent.delete_present_confirmation_msg', { name }), '', {
        timeout: -1,
        showProgressBar: true,
        buttons: [
          {
            text: this.$t('common.delete'),
            action: toast => {
              this.removeGift(this.gift.id);
              this.$snotify.remove(toast.id);
            },
            bold: true,
          },
          {
            text: this.$t('common.keep'),
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: false,
          },
        ],
      });
    },
    removeGift(id) {
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
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeMyEventGift.scss';
</style>
