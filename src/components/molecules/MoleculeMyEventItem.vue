<template>
  <li v-click-outside="closeDropdown" class="my-event-item-wrapper">
    <router-link
      :to="{
        name: eventPageName,
        params: { id: eventItem.id },
      }"
      :class="['my-event-item', { blinking: blinking }]"
    >
      <div class="event-content">
        <img
          v-if="isShowEventHostAvatar"
          class="event-host-avatar"
          :src="eventHostAvatar"
          :alt="eventItem.user?.name"
          width="32"
          height="32"
        />

        <div class="event-info">
          <p class="event-date">
            {{ dateTimeFormatted }} <span class="event-date-day">{{ dateDayName }}</span>
          </p>

          <p class="event-name" :title="eventItem.name">{{ eventItem.name }}</p>
        </div>
      </div>

      <button v-if="isDropdownNotEmpty" class="event-dropdown-toggle-btn" @click.prevent.stop="toggleDropdown">
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

      <div v-if="isDropdownShown" v-click-outside="closeDropdown" class="event-dropdown">
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
          v-if="isSecretSanta && eventItem.saved === 2"
          class="event-dropdown-btn"
          @click.prevent.stop="showGiftee(eventItem.id)"
        >
          <img :src="require('@/assets/images/svg/gift-icon.svg')" alt="" /> {{ $t('events.whomDoWeGive') }}
        </button>
        <button
          v-if="!isSecretSanta && isCreatedByMe && isBeforeEventDate"
          class="event-dropdown-btn"
          @click.prevent.stop="showEditModal"
        >
          <img :src="require('@/assets/images/svg/edit.svg')" alt="" /> {{ $t('common.edit') }}
        </button>
        <button
          v-else-if="isSecretSanta && isCreatedByMe && isBeforeEventDate"
          class="event-dropdown-btn"
          @click.prevent.stop="showEditModal"
        >
          <img :src="require('@/assets/images/svg/edit.svg')" alt="" /> {{ $t('common.edit') }}
        </button>
        <button
          v-if="isCreatedByMe && isBeforeEventDate"
          class="event-dropdown-btn"
          @click.prevent.stop="confirmRemoveEvent(eventItem.name)"
        >
          <img :src="require('@/assets/images/svg/delete.svg')" alt="" /> {{ $t('createEvent.delete') }}
        </button>
      </div>
    </router-link>

    <vue-snotify />
  </li>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';
import AtomLink from '@/components/atoms/AtomLink';

export default {
  name: 'MoleculeMyEventItem',
  components: {
    AtomLink,
  },
  props: {
    eventItem: {
      type: Object,
      required: true,
      default: null,
    },
    blinking: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDropdownShown: false,
      isModalShown: false,
    };
  },
  computed: {
    ...mapGetters({
      userProfile: getterTypes.USER_DATA,
      giftee: getterTypes.CURRENT_EVENT_GIFTEE,
    }),
    eventPageName() {
      const eventsTypes = {
        EventsSecretSanta: 'EventSecretSanta',
        EventsAnniversary: 'EventAnniversary',
        EventsInvited: 'EventInvited',
      };

      return eventsTypes[this.$route.name];
    },
    eventHostAvatar() {
      if (!this.eventItem.user?.avatar) {
        return require(`@/assets/images/svg/user.svg`);
      }

      return this.eventItem.user?.avatar;
    },
    isSecretSanta() {
      return ['EventsSecretSanta', 'EventSecretSanta'].includes(this.$route.name);
    },
    isShowEventHostAvatar() {
      return ['EventsInvited', 'EventInvited', 'EventsSecretSanta', 'EventSecretSanta'].includes(this.$route.name);
    },
    isCreatedByMe() {
      return this.userProfile?.id === this.eventItem?.user_id;
    },
    isBeforeEventDate() {
      return new Date().getTime() < new Date(this.eventItem.datetime).getTime();
    },
    isDropdownNotEmpty() {
      return (
        this.isSecretSanta ||
        (!this.isSecretSanta && this.isCreatedByMe && this.isBeforeEventDate) ||
        (this.isCreatedByMe && this.isBeforeEventDate)
      );
    },
    dateTimeFormatted() {
      const date = new Date(this.eventItem.datetime);
      const day = date.getDate();
      const month = this.$t('profile.calendar.monthsShort')[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    },
    dateDayName() {
      const date = new Date(this.eventItem.datetime);
      const day = new Date(date).getDay();

      return `${this.$t('profile.calendar.days')[day]}`;
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownShown = !this.isDropdownShown;
      this.$emit('close-all-dropdowns', { refName: 'event-item-link', id: this.eventItem.id });
    },
    closeDropdown() {
      if (this.isDropdownShown === true) {
        this.isDropdownShown = false;
      }
    },
    showEditModal() {
      this.closeDropdown();
      this.$emit('show-edit-modal', this.eventItem);
    },
    confirmRemoveEvent(name) {
      this.closeDropdown();
      this.$snotify.clear();
      this.$snotify.confirm(this.$t('events.goingToDelete', { name }), '', {
        timeout: -1,
        showProgressBar: true,
        buttons: [
          {
            text: this.$t('common.delete'),
            action: toast => {
              this.removeEvent(this.eventItem.id);
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
    removeEvent(id) {
      this.$snotify.clear();
      this.$store
        .dispatch(actionTypes.DELETE_SS_EVENT, id)
        .then(() => {
          this.closeDropdown();

          this.$snotify.success(this.$t('events.deletedSuccessfully'), '', {
            timeout: -1,
            showProgressBar: true,
          });

          this.$emit('update-events');
        })
        .catch(error => {
          console.warn(error);
        });
    },
    showGiftee(id) {
      this.closeDropdown();
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
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/molecules/MoleculeMyEventItem.scss';
</style>
