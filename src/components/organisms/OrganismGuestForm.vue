<template>
  <div id="addGuest" class="event-edit-form">
    <atom-title
      class="mb-16"
      tag="h1"
      text-size="text-32"
      :text="`${$t('createEvent.new_guest')}`"
      text-color="text-violet-color"
      text-position="text-center"
    />

    <form autocomplete="off" @submit.prevent="validateForm('guestData')">
      <div class="form-base form-label form-css-label">
        <fieldset
          :class="{ 'error-style': errors.has('name'), 'not-empty': guestData.name.length !== 0 }"
          class="form-label-group"
        >
          <input id="nameInput" v-model="guestData.name" v-validate="'required'" type="text" name="name" />
          <label for="nameInput">{{ $t('createEvent.guest_name') }} *</label>
          <span class="error-message">{{ errors.first('name') }}</span>
        </fieldset>

        <fieldset
          :class="{ 'error-style': errors.has('location'), 'not-empty': guestData.contact.length !== 0 }"
          class="form-label-group"
        >
          <input
            id="locationInput"
            v-model="guestData.contact"
            v-validate="'required|phoneOrEmail'"
            type="text"
            name="contact"
          />
          <label for="locationInput">{{ $t('createEvent.guest_contact') }} *</label>
          <span class="error-message">{{ errors.first('contact') }}</span>
        </fieldset>

        <molecule-select-language
          id="notificationLanguage"
          v-model="guestData.notificationLanguage"
          validation-rules="required"
          :label="`${$t('createEvent.notification_language')}`"
          name="notificationLanguage"
          @changeSelectedOption="changeNotificationLanguage"
        />

        <button type="submit" class="v-btn-wide">{{ $t('common.proceed') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import actionTypes from '@/store/types/action-types';
import getterTypes from '@/store/types/getter-types';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomTimepicker from '@/components/atoms/AtomTimepicker';
import AtomCalendar from '@/components/atoms/AtomCalendar';
import MoleculeSelectLanguage from '@/components/molecules/MoleculeSelectLanguage';

export default {
  components: {
    AtomTitle,
    AtomTimepicker,
    AtomCalendar,
    MoleculeSelectLanguage,
  },
  props: {
    isModalOpened: {
      type: Boolean,
      default: false,
    },
    eventType: {
      type: String,
      default: 'anniversary',
    },
  },
  data() {
    return {
      guestData: {
        name: '',
        contact: '',
        notificationLanguage: '',
      },
    };
  },
  watch: {
    isModalOpened() {
      if (!this.guestData.name && !this.guestData.contact) {
        this.$validator.reset();
      }
    },
  },
  computed: {
    ...mapGetters({
      currentEvent: getterTypes.CURRENT_EVENT,
      lang: getterTypes.GET_LANGUAGE,
    }),
  },
  mounted() {
    this.guestData.notificationLanguage = this.lang;
  },
  methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.addGuest();
        }
      });
    },
    changeNotificationLanguage(val, name) {
      this.guestData[name] = val;
    },
    addGuest() {
      const guestData = {
        event_id: this.currentEvent.id,
        localization: this.guestData.notificationLanguage,
        name: this.guestData.name,
        username: this.guestData.contact,
      };

      const addGuestAction =
        this.eventType === 'anniversary' ? actionTypes.ADD_ANNIVERSARY_GUESTS : actionTypes.ADD_SS_GUESTS;
      this.$store.dispatch(addGuestAction, guestData).then(response => {
        this.$snotify.clear();
        this.$snotify.success(response);
        this.$emit('close-parent-modal');
        this.resetForm();
      });
    },
    resetForm() {
      this.guestData = {
        name: '',
        contact: '',
        notificationLanguage: this.lang,
      };
    },
  },
};
</script>

<style scoped></style>
