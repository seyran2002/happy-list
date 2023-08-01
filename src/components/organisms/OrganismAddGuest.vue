<template>
  <form class="new-add-guest-form form-label form-css-label" autocomplete="off" @submit.prevent="validateForm()">
    <h1 v-if="isShowTitle" class="text-center text-32 font-source-bold text-main-color hg-add-guest-modal-title">
      {{ $t('createEvent.new_guest') }}
    </h1>

    <molecule-new-guest-form :guest-data="guestData" @changeInputVal="changeInputVal" />

    <molecule-select-language
      id="notificationLanguage"
      v-model="guestData.notification_language"
      validation-rules="required"
      :label="$t('createEvent.notification_language')"
      name="notification_language"
      @changeSelectedOption="changeNotificationLanguage"
    />

    <atom-button
      class="btn add-guest-btn"
      background="btn-gradient-color"
      text-color="text-white-color"
      tag="button"
      font-family="font-source-bold"
      text-size="text-14"
    >
      {{ $t(`createEvent.${eventType}_add_guest`) }}
    </atom-button>

    <atom-button
      v-if="isAddMe"
      type="button"
      class="btn add-me-btn btn-default"
      background="btn-gradient-color"
      text-color="text-white-color"
      tag="button"
      font-family="font-source-bold"
      text-size="text-14"
      @click.native="addMe"
    >
      {{ $t('createEvent.add_me') }}
    </atom-button>
  </form>
</template>

<script>
import AtomButton from '@/components/atoms/AtomButton';
import MoleculeNewGuestForm from '@/components/molecules/MoleculeNewGuestForm';
import MoleculeSelectLanguage from '@/components/molecules/MoleculeSelectLanguage';
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import { phoneOrEmailRule } from '@/utils/validators';
import actionTypes from '@/store/types/action-types';

export default {
  name: 'OrganismAddGuest',
  components: {
    AtomButton,
    MoleculeNewGuestForm,
    MoleculeSelectLanguage,
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    isShowTitle: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      userData: getterTypes.USER_DATA,
      currentLang: getterTypes.GET_LANGUAGE,
      userProfile: getterTypes.USER_DATA,
      currentEventGuests: getterTypes.CURRENT_EVENT_GUESTS,
    }),
    isAddMe() {
      const result = this.currentEventGuests.filter(event => event.user.username === this.userProfile.username);
      return !result.length && this.eventType === 'secret-santa';
    },
  },
  data() {
    return {
      eventType: this.type ? this.type : this.$route.params.eventType,
      guestData: {
        guest_name: '',
        guest_contact: '',
        notification_language: '',
      },
    };
  },
  created() {
    this.guestData.notification_language = this.currentLang;
    this.$eventHub.$on('add-me', this.addMe);
  },
  methods: {
    changeNotificationLanguage(val, name) {
      this.guestData[name] = val;
    },
    changeInputVal(val, name) {
      this.guestData[name] = val;
    },
    validateForm() {
      this.$eventHub.$emit('check-validate');
      if (
        this.guestData.guest_name &&
        this.guestData.notification_language &&
        phoneOrEmailRule.validate(this.guestData.guest_contact)
      ) {
        if (this.$route.params.eventType === 'anniversary' && this.userData.username === this.guestData.guest_contact) {
          this.$snotify.error(this.$t('createEvent.yourself_error'));
        } else {
          this.next();
        }
      } else {
        this.$snotify.error(this.$t('createEvent.form_error_msg'));
      }
    },
    next() {
      const guestData = {
        event_id: this.eventId,
        localization: this.guestData.notification_language,
        name: this.guestData.guest_name,
        username: this.guestData.guest_contact,
      };
      this.addGuest(guestData);
    },
    addMe() {
      const guestData = {
        event_id: this.eventId,
        localization: this.userProfile.localization,
        name: this.userProfile.name,
        username: this.userProfile.username,
        image: this.userProfile.avatar,
      };

      this.addGuest(guestData);
    },
    addGuest(guestData) {
      const addGuestAction =
        this.eventType === 'secret-santa' ? actionTypes.ADD_SS_GUESTS : actionTypes.ADD_ANNIVERSARY_GUESTS;
      this.$store.dispatch(addGuestAction, guestData).then(response => {
        this.$snotify.success(response);
        this.resetNewGuestForm();
        this.$emit('guest-added');
      });
    },
    resetNewGuestForm() {
      this.guestData = {
        guest_name: '',
        guest_contact: '',
        notification_language: this.currentLang,
      };
      this.$eventHub.$emit('reset-form');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/organisms/OrganismAddGuest.scss';
</style>
