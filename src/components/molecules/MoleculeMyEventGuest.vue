<template>
  <li v-click-outside="closeDropdown" class="guests-item-wrapper">
    <article class="guests-item">
      <div class="d-flex items-center justify-space-between gap-12">
        <img class="guests-item-avatar" :src="guestAvatar" :alt="guest.name" width="32" height="32" />
        <div class="d-flex items-center justify-space-between hg-full-width">
          <div class="guests-item-content">
            <p class="guests-item-name">{{ guest.name }}</p>
            <p v-if="isCreatedByMe && !isInvitedEvent && !isSecretSanta" class="guests-item-contact">
              {{ guest.user?.username }}
            </p>
          </div>

          <div class="d-flex items-center gap-20">
            <div
              v-if="isCreatedByMe && guest.guest_sight === 0"
              class="guest-hidden-status"
              @mouseover="showHiddenGuestTooltip"
              @focus="showHiddenGuestTooltip"
              @mouseleave="hideHiddenGuestTooltip"
              @blur="hideHiddenGuestTooltip"
            >
              <img :src="require(`@/assets/images/svg/hide.svg`)" alt="" />

              <transition name="tooltip-fade">
                <atom-tooltip v-show="isHiddenGuestTooltipShown" class="guest-tooltip">
                  <div class="d-flex items-center gap-12">
                    <atom-text text-size="text-12" :text="$t('events.hiddenGuest')" />
                  </div>
                </atom-tooltip>
              </transition>
            </div>

            <div
              v-if="!isSecretSanta"
              class="guests-item-status"
              :style="{ backgroundColor: statusColor.color }"
              @mouseover="showStatusTooltip"
              @focus="showStatusTooltip"
              @mouseleave="hideStatusTooltip"
              @blur="hideStatusTooltip"
            >
              <transition name="tooltip-fade">
                <atom-tooltip v-show="isStatusTooltipShown" class="guest-tooltip" :style="tooltipStyle">
                  <div class="d-flex items-center gap-12">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 9.36001V10.006C16.9987 11.5154 16.5096 12.984 15.6055 14.1927C14.7014 15.4014 13.4309 16.2855 11.9833 16.7132C10.5358 17.1408 8.98874 17.0891 7.57296 16.5658C6.15718 16.0424 4.94849 15.0755 4.12713 13.8091C3.30577 12.5427 2.91575 11.0448 3.01522 9.53868C3.1147 8.03255 3.69834 6.59892 4.67912 5.45158C5.6599 4.30424 6.98526 3.50465 8.45758 3.17205C9.92989 2.83946 11.4703 2.99168 12.849 3.60601"
                        :stroke="statusColor.color"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.0004 4.40399L10.0004 11.411L7.90039 9.31099"
                        :stroke="statusColor.color"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <atom-text text-size="text-12" :text="statusColor.text" />
                  </div>
                </atom-tooltip>
              </transition>
            </div>

            <button
              v-if="
                !isPresentGuests &&
                isCreatedByMe &&
                isBeforeEventDate &&
                (!isSecretSanta || (guest.user.username !== userProfile.username && currentEvent.saved !== 2))
              "
              class="guests-item-dropdown-btn"
              @click.stop="toggleDropdown"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0007 11.6667C10.9211 11.6667 11.6673 10.9205 11.6673 10C11.6673 9.07952 10.9211 8.33333 10.0007 8.33333C9.08018 8.33333 8.33398 9.07952 8.33398 10C8.33398 10.9205 9.08018 11.6667 10.0007 11.6667Z"
                  fill="#828282"
                />
                <path
                  d="M10.0007 5.83333C10.9211 5.83333 11.6673 5.08714 11.6673 4.16667C11.6673 3.24619 10.9211 2.5 10.0007 2.5C9.08018 2.5 8.33398 3.24619 8.33398 4.16667C8.33398 5.08714 9.08018 5.83333 10.0007 5.83333Z"
                  fill="#828282"
                />
                <path
                  d="M10.0007 17.5C10.9211 17.5 11.6673 16.7538 11.6673 15.8333C11.6673 14.9129 10.9211 14.1667 10.0007 14.1667C9.08018 14.1667 8.33398 14.9129 8.33398 15.8333C8.33398 16.7538 9.08018 17.5 10.0007 17.5Z"
                  fill="#828282"
                />
              </svg>
            </button>

            <div v-show="isDropdownShown" v-click-outside="closeDropdown" class="event-dropdown" :style="dropdownStyle">
              <button class="event-dropdown-close-btn" @click.prevent.stop="closeDropdown">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 3.5L3.5 10.5"
                    stroke="#11064A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.5 3.5L10.5 10.5"
                    stroke="#11064A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                v-if="
                  !isSecretSanta &&
                  isCreatedByMe &&
                  isBeforeEventDate &&
                  ['notInvited', 'declined'].includes(guestStatus)
                "
                class="event-dropdown-btn"
                @click.prevent.stop="confirmInviteGuest"
              >
                <img :src="require('@/assets/images/svg/plus-dark.svg')" alt="" width="20" height="20" />
                {{ $t('common.invite') }}
              </button>
              <template>
                <button
                  v-if="!isSecretSanta && isCreatedByMe && isBeforeEventDate"
                  class="event-dropdown-btn"
                  @click.prevent.stop="toggleGuestVisibility"
                >
                  <img :src="require(`@/assets/images/svg/${guestVisibilityContent.icon}.svg`)" alt="" />
                  {{ guestVisibilityContent.text }}
                </button>
                <button
                  v-if="isCreatedByMe && isBeforeEventDate"
                  class="event-dropdown-btn"
                  @click.prevent.stop="confirmRemoveGuest"
                >
                  <img :src="require('@/assets/images/svg/delete.svg')" alt="" /> {{ $t('createEvent.delete') }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div v-if="guest.presents?.length" class="guests-item-gifts">
        <img
          v-for="({ image, name, id, guest_sight }, index) in guest.presents"
          :key="id"
          class="gift-image"
          :src="getGiftImage(name, image, guest_sight)"
          :alt="name"
          :title="guest_sight === 1 ? name : ''"
          :style="{
            transform: `translateX(-${6 * index}px)`,
          }"
          @click="setupGiftsSearch(name)"
        />
      </div>
    </article>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import AtomTooltip from '@/components/atoms/AtomTooltip';
import AtomText from '@/components/atoms/AtomText';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'MoleculeMyEventGuest',
  components: {
    AtomTooltip,
    AtomText,
    OrganismModal: () => import('../organisms/OrganismModal'),
  },
  props: {
    guest: {
      type: Object,
      required: true,
      default: () => {},
    },
    isPresentGuests: {
      type: Boolean,
      default: false,
    },
    isIncognitoGuest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isStatusTooltipShown: false,
      isHiddenGuestTooltipShown: false,
      isDropdownShown: false,
      isEditModalShown: false,
      observer: null,
      isFullyInViewport: false,
    };
  },
  computed: {
    ...mapGetters({
      userProfile: getterTypes.USER_DATA,
      currentEvent: getterTypes.CURRENT_EVENT,
    }),
    guestStatus() {
      if (this.isIncognitoGuest) {
        return 'accepted';
      }

      if (this.guest.notified === 1) {
        const statuses = {
          status_1: 'accepted',
          status_0: 'pending',
          status_2: 'declined',
        };

        if (this.isPresentGuests) {
          return statuses[`status_${this.guest?.pivot?.accepted}`];
        }

        return statuses[`status_${this.guest.accepted}`];
      }

      return 'notInvited';
    },
    statusColor() {
      const colors = {
        accepted: { color: '#27ae60', text: this.$t('events.statusAccepted') },
        pending: { color: '#e6e600', text: this.$t('events.statusPending') },
        notInvited: { color: '#f2994a', text: this.$t('events.statusNotInvited') },
        declined: { color: '#eb5757', text: this.$t('events.statusDeclined') },
      };

      return colors[this.guestStatus ? this.guestStatus : 'notInvited'];
    },
    guestAvatar() {
      if (this.guest?.user?.avatar || this.guest?.avatar) {
        return this.guest?.user?.avatar || this.guest?.avatar;
      }

      return require(`@/assets/images/svg/user.svg`);
    },
    isSecretSanta() {
      return ['EventsSecretSanta', 'EventSecretSanta'].includes(this.$route.name);
    },
    isInvitedEvent() {
      return ['EventsInvited', 'EventInvited'].includes(this.$route.name);
    },
    isCreatedByMe() {
      return this.userProfile.id === this.currentEvent.user_id;
    },
    isBeforeEventDate() {
      return new Date().getTime() < new Date(this.currentEvent.datetime).getTime();
    },
    guestVisibilityContent() {
      return this.guest.host_sight
        ? {
            text: this.$t('events.hideGuest'),
            icon: 'hide',
          }
        : {
            text: this.$t('events.showGuest'),
            icon: 'show',
          };
    },
    tooltipStyle() {
      return !this.isFullyInViewport
        ? {
            top: '-54px',
            bottom: '100%',
          }
        : {};
    },
    dropdownStyle() {
      return !this.isFullyInViewport
        ? {
            top: '-91px',
            bottom: '100%',
          }
        : {};
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting === true) {
          this.isFullyInViewport = true;
          return;
        }

        this.isFullyInViewport = false;
      },
      { threshold: [1] }
    );

    this.observer.observe(this.$el);
  },
  methods: {
    showStatusTooltip() {
      this.isStatusTooltipShown = true;
    },
    hideStatusTooltip() {
      this.isStatusTooltipShown = false;
    },
    showHiddenGuestTooltip() {
      this.isHiddenGuestTooltipShown = true;
    },
    hideHiddenGuestTooltip() {
      this.isHiddenGuestTooltipShown = false;
    },
    toggleDropdown() {
      this.isDropdownShown = !this.isDropdownShown;
      this.$emit('close-all-dropdowns', { refName: 'event-item-guest', id: this.guest.id });
    },
    closeDropdown() {
      if (this.isDropdownShown === true) {
        this.isDropdownShown = false;
      }
    },
    getGiftImage(name, img, sight) {
      if ((name.length === 0 || !sight) && this.guest.user.id !== this.userProfile.id) {
        return require(`@/assets/images/svg/icon-question.svg`);
      }
      if (!img) {
        return require(`@/assets/images/svg/gift.svg`);
      }

      return img;
    },
    setupGiftsSearch(name) {
      this.$eventHub.$emit('setup-search', { filterBy: 'gifts', filterStr: name });
    },
    toggleGuestVisibility() {
      this.closeDropdown();

      this.$store
        .dispatch(actionTypes.UPDATE_GUEST_SIGHT, {
          guestID: this.guest.id,
          payload: { host_sight: !this.guest.host_sight },
        })
        .then(() => {
          this.$snotify.clear();

          this.$snotify.info(this.$t('events.guestUpdatedSuccessfully'), '', {
            timeout: -1,
            showProgressBar: true,
          });
        });
    },
    confirmInviteGuest() {
      this.closeDropdown();

      this.$snotify.clear();
      this.$snotify.confirm(`${this.$t('events.guestGoingToInvite', { name: this.guest.user.name })}`, '', {
        timeout: -1,
        showProgressBar: true,
        buttons: [
          {
            text: this.$t('common.invite'),
            action: toast => {
              this.inviteGuest(this.guest.id);
              this.$snotify.remove(toast.id);
            },
            bold: true,
          },
          {
            text: this.$t('common.later'),
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: false,
          },
        ],
      });
    },
    confirmRemoveGuest() {
      this.closeDropdown();

      this.$snotify.clear();
      this.$snotify.confirm(`${this.$t('createEvent.delete_guest_confirmation_msg', { name: this.guest.name })}`, '', {
        timeout: -1,
        showProgressBar: true,
        buttons: [
          {
            text: this.$t('common.delete'),
            action: toast => {
              this.removeGuest(this.guest.id);
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
    removeGuest(id) {
      const deleteGuestAction = this.isSecretSanta
        ? actionTypes.DELETE_SS_GUEST_BY_ID
        : actionTypes.DELETE_ANNIVERSARY_GUEST_BY_ID;
      this.$store
        .dispatch(deleteGuestAction, {
          guestID: id,
          eventID: this.currentEvent.id,
        })
        .then(() => {
          this.$snotify.clear();
          this.$snotify.success(this.$t('events.guestDeletedSuccessfully'), '', {
            timeout: -1,
            showProgressBar: true,
          });

          this.closeDropdown();
        })
        .catch(error => console.error(error));
    },
    inviteGuest(id) {
      this.$store
        .dispatch(actionTypes.INVITE_GUEST, id)
        .then(() => {
          this.$snotify.clear();
          this.$snotify.success(this.$t('events.guestInvitedSuccessfully'), '', {
            timeout: -1,
            showProgressBar: true,
          });

          this.$store.dispatch(actionTypes.GET_ANNIVERSARY_GUESTS, this.currentEvent.id);

          this.closeDropdown();
        })
        .catch(error => console.error(error));
    },
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/molecules/MoleculeMyEventGuest.scss';
</style>
