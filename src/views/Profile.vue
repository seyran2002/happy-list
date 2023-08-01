<template>
  <div class="profile-page">
    <div class="profile-data">
      <organism-profile-data
        v-if="USER_DATA"
        :title="`${$t('profile.editProfile')}`"
        :breadcrumbsLinks="breadcrumbsLinks"
        :form-inputs="profileInputs"
        :form-date="datePicker"
        :user-data="USER_DATA"
        @submit-profile="submitProfileData"
        @changeInputVal="changeInputVal"
        @dateValueChange="dateValueChange"
        @avatar="avatar"
      />
      <organism-change-password />

      <atom-button
        v-if="hasFbData"
        class="mt-42 remove-fbdata-btn"
        text-size="text-16"
        text-color="text-red-color"
        @click.native="confirmFbUserDeletion"
      >
        {{ $t('profile.deleteFbUser') }}
      </atom-button>
    </div>
    <div class="profile-calendar">
      <molecule-full-calendar-features :allEvents="allEvents" />
    </div>
    <vue-snotify />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AtomButton from '@/components/atoms/AtomButton';
import MoleculeFullCalendarFeatures from '../components/molecules/MoleculeFullCalendarFeatures';
import MoleculeBox from '../components/molecules/MoleculeBox';
import OrganismProfileData from '../components/organisms/OrganismProfileData';
import OrganismChangePassword from '../components/organisms/OrganismChangePassword';
import actionTypes from '../store/types/action-types';
import getterTypes from '../store/types/getter-types';
import mutationTypes from '../store/types/mutation-types';

export default {
  name: 'ProfilePage',
  components: {
    AtomButton,
    MoleculeBox,
    MoleculeFullCalendarFeatures,
    OrganismProfileData,
    OrganismChangePassword,
  },
  created() {
    this.$store.dispatch(actionTypes.GET_CURRENT_ANNIVERSARY);
    this.$store.dispatch(actionTypes.GET_SS_EVENTS);
    this.$store.dispatch(actionTypes.GET_CURRENT_SS);
    this.$store.dispatch(actionTypes.GET_MY_INVITED_EVENTS);
    this.$store.dispatch(actionTypes.GET_MY_EVENTS);
  },
  computed: {
    ...mapGetters({
      USER_DATA: getterTypes.USER_DATA,
      MY_EVENTS: getterTypes.MY_EVENTS,
      SS_EVENTS: getterTypes.SS_EVENTS,
      CURRENT_SANTA_EVENTS: getterTypes.CURRENT_SANTA_EVENTS,
      MY_INVITED_EVENTS: getterTypes.MY_INVITED_EVENTS,
      MY_CONFIRMED_EVENTS: getterTypes.MY_CONFIRMED_EVENTS,
    }),
    profileInputs() {
      return [
        {
          id: 'name',
          name: 'name',
          value: !this.USER_DATA || this.USER_DATA.name === null ? '' : this.USER_DATA?.name,
          label: this.$t('profile.nameSurname'),
          validationRules: 'required',
        },
        {
          id: 'username',
          name: 'username',
          value: !this.USER_DATA || this.USER_DATA.username === null ? '' : this.USER_DATA?.username,
          label: this.$t('profile.contact'),
          validationRules: 'required|phoneOrEmail',
        },
        {
          id: 'country',
          name: 'country',
          value: !this.USER_DATA || this.USER_DATA.country === null ? '' : this.USER_DATA.country,
          label: this.$t('profile.city'),
          validationRules: '',
        },
      ];
    },
    datePicker() {
      return {
        date: !this.USER_DATA || this.USER_DATA.date_of_birth === null ? '' : this.USER_DATA.date_of_birth,
      };
    },
    breadcrumbsLinks() {
      return [
        {
          to: '/',
          text: this.$t('pages.home'),
        },
        {
          to: '/profile',
          text: this.$t('header.profile'),
        },
      ];
    },
    allEvents() {
      const invited = this.MY_INVITED_EVENTS.map(v => v.event);
      return [
        ...this.MY_EVENTS.map(v => {
          v.status = 'anniversary';
          v.eventStatus = 'inProgress';
          v.backgroundColor = 'rgb(242, 153, 74)';
          return v;
        }),
        ...this.CURRENT_SANTA_EVENTS.map(v => {
          v.status = 'secret-santa';
          v.eventStatus = 'inProgress';
          v.backgroundColor = 'rgb(242, 153, 74)';
          return v;
        }),
        ...this.MY_CONFIRMED_EVENTS.map(v => {
          v.status = 'anniversary';
          v.backgroundColor = '#a0a8d7';
          return v;
        }),
        ...this.SS_EVENTS.map(v => {
          v.status = 'secret-santa';
          v.backgroundColor = '#a0a8d7';
          return v;
        }),
        ...invited.map(v => {
          v.status = 'invited';
          v.backgroundColor = '#a0a8d7';
          return v;
        }),
      ].map(item => {
        item.date = item.datetime;
        item.start = item.datetime;
        item.title = item.name;
        return item;
      });
    },
    hasFbData() {
      return !!this.USER_DATA?.facebook_id;
    },
  },
  methods: {
    changeInputVal(value, name) {
      this.$store.commit(mutationTypes.CHANGE_USER_DATA_ITEM, {
        key: name,
        value,
      });
    },
    dateValueChange(newDate) {
      this.$store.commit(mutationTypes.CHANGE_USER_DATA_ITEM, {
        key: 'date_of_birth',
        value: newDate,
      });
    },
    avatar(formData) {
      this.$store.dispatch(actionTypes.UPLOAD_IMAGE, formData);
    },
    async submitProfileData() {
      this.$snotify.clear();
      this.$store.commit(mutationTypes.CHANGE_USER_DATA_ITEM, {
        key: 'country',
        value: document.getElementById('country').value,
      });
      const data = await this.$store.dispatch(actionTypes.EDIT_PROFILE_INFO);
      if (data) {
        this.$snotify.success(this.$t('success.successUpdated'));
      }
    },
    confirmFbUserDeletion() {
      this.$snotify.clear();

      this.$snotify.confirm(this.$t('profile.fbUserDataConfirm'), '', {
        timeout: -1,
        buttons: [
          {
            text: this.$t('common.delete'),
            action: toast => {
              this.deleteFbUser();
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
    deleteFbUser() {
      this.$store.dispatch(actionTypes.DELETE_FB_USER).then(() => {
        this.$router.push({ name: 'Home' });
      });
    },
  },
};
</script>

<style lang="scss">
@import '../assets/styles/pages/Profile.scss';
</style>
