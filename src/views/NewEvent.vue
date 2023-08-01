<template>
  <div
    class="hg-new-event-content"
    :class="{
      'hg-display-flex hg-active-full-list': isShowGuestsFullList || isShowPresentsFullList,
      'hg-active-guests-full-list': isShowGuestsFullList,
      'hg-active-presents-full-list': isShowPresentsFullList,
    }"
  >
    <vue-snotify></vue-snotify>

    <div class="new-event">
      <div class="hg-content-header">
        <lazy-load-image
          class="icon-content hg-event-create-img"
          :src="require(`@/assets/images/svg/event-create-form-img.svg`)"
          width="48"
          height="56"
        />

        <atom-title
          class="new-event-title"
          :text="$t('createEvent.title')"
          font-family="font-source-bold"
          text-size="text-32"
          tag="h1"
        />
      </div>

      <div class="new-event-content">
        <atom-text :key="step" class="create-event--wrapper-info-form-block---title" :text="wizardText" />

        <molecule-wizard :step="step" :max-steps="maxSteps" />

        <div v-if="eventLoaded">
          <organism-new-event v-if="step === 1" />

          <div v-else-if="step === 2 && eventID" class="hg-add-guests-step">
            <organism-add-guest :event-id="eventID" />
            <atom-text
              v-if="eventType === 'anniversary'"
              class="hg-mt-30"
              :text="$t('createEvent.invitation_link_description')"
            />
            <atom-invite-link
              v-if="currentEvent.invite_url"
              id="inviteLink"
              class="mt-20"
              name="invite_link"
              text-size="text-11"
              border-radius="border-radius-10"
              :input-icons="inputIcons"
              input-icons-position="append-icons-right"
              :value="currentEvent.invite_url"
            />
            <organism-guests-list
              v-if="guestsLoaded"
              :event-id="eventID"
              :event-type="eventType"
              :guests-list="currentEventGuestsShortList"
              :all-guests-count="currentEventGuests.length"
              @hideGuestsFullList="hideShowGuestsFullList"
            />
            <atom-link
              v-if="!isShowGuestsFullList && currentEventGuests.length > 4"
              class="btn hg-show-more-btn show-more-guests-btn"
              tag="button"
              text-size="text-14"
              background="btn-default"
              font-family="font-source-semiBold"
              @click.native="isShowGuestsFullList = true"
              >{{ getGuestsShowMoreTxt }}</atom-link>
          </div>

          <div v-else-if="step === 3 && eventID" class="hg-add-presents-step">
            <organism-add-present :event-id="eventID" />
            <organism-presents-list
              v-if="presentsLoaded"
              :event-id="eventID"
              :presents-list="currentEventPresentsShortList"
              :all-presents-count="currentEventPresents.length"
              @hidePresentsFullList="hideShowPresentsFullList"
            />

            <atom-link
              v-if="!isShowPresentsFullList && currentEventPresents.length > 4"
              class="btn hg-show-more-btn show-more-presents-btn"
              tag="button"
              text-size="text-14"
              background="btn-default"
              font-family="font-source-semiBold"
              @click.native="isShowPresentsFullList = true"
              >{{ getPresentsShowMoreTxt }}</atom-link>
          </div>

          <div>
            <molecule-new-event-btns
              :is-show-cancel="!!Object.keys(currentEvent).length"
              :is-show-back="step > 1"
              @next="next"
              @back="backStep"
              @confirmRemoveEvent="confirmRemoveEvent"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="isShowGuestsFullList" class="hg-guests-full-list">
      <organism-guests-list
        :event-id="eventID"
        :event-type="eventType"
        :guests-list="currentEventGuestsLargeList"
        :all-guests-count="currentEventGuests.length"
        @hideGuestsFullList="hideShowGuestsFullList"
      />

      <atom-link
        class="btn back-btn"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        background="btn-gradient-color"
        font-family="font-source-bold"
        button-position="float-right"
        @click.native="hideShowGuestsFullList()"
        >{{ $t('createEvent.back') }}</atom-link>
    </div>

    <div v-else-if="isShowPresentsFullList" class="hg-presents-full-list">
      <organism-presents-list
        :event-id="eventID"
        :presents-list="currentEventPresentsLargeList"
        :all-presents-count="currentEventPresents.length"
        @hideGuestsFullList="hideShowPresentsFullList"
      />

      <atom-link
        class="btn back-btn"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        background="btn-gradient-color"
        font-family="font-source-bold"
        button-position="float-right"
        @click.native="hideShowPresentsFullList()"
        >{{ $t('createEvent.back') }}</atom-link>
    </div>

    <organism-modal v-if="eventFullCreated" :is-show-close-icon="false" class="event-success-created-modal">
      <template v-slot:body>
        <organism-event-created-success
          :invite-url="currentEvent.invite_url"
          :event-id="eventID"
          :event-type="eventType"
          :event-name="currentEvent.name"
          @close="closeSuccessModal"
          @finish="finishEvent"
        />
      </template>
    </organism-modal>
  </div>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomText from '@/components/atoms/AtomText';
import AtomLink from '@/components/atoms/AtomLink';
import AtomInviteLink from '@/components/atoms/AtomInviteLink';
import MoleculeIconLink from '@/components/molecules/MoleculeIconLink';
import MoleculeWizard from '@/components/molecules/MoleculeWizard';
import MoleculeNewEventBtns from '@/components/molecules/MoleculeNewEventBtns';
import OrganismNewEvent from '@/components/organisms/OrganismNewEvent';
import OrganismAddGuest from '@/components/organisms/OrganismAddGuest';
import OrganismGuestsList from '@/components/organisms/OrganismGuestsList';
import OrganismAddPresent from '@/components/organisms/OrganismAddPresent';
import OrganismPresentsList from '@/components/organisms/OrganismPresentsList';
import OrganismModal from '@/components/organisms/OrganismModal';
import OrganismEventCreatedSuccess from '@/components/organisms/OrganismEventCreatedSuccess';
import { mapGetters } from 'vuex';
import router from '@/router';
import actionTypes from '@/store/types/action-types';
import getterTypes from '@/store/types/getter-types';
import mutationTypes from '@/store/types/mutation-types';

export default {
  name: 'CreateEventPage',
  components: {
    AtomLink,
    AtomTitle,
    AtomText,
    AtomInviteLink,
    MoleculeIconLink,
    MoleculeWizard,
    MoleculeNewEventBtns,
    OrganismNewEvent,
    OrganismAddGuest,
    OrganismGuestsList,
    OrganismAddPresent,
    OrganismPresentsList,
    OrganismModal,
    OrganismEventCreatedSuccess,
  },
  metaInfo() {
    return {
      title: 'Create Event',
      meta: [{ vmid: 'description', name: 'description', content: 'This is Create Event page' }],
    };
  },
  computed: {
    ...mapGetters({
      userProfile: getterTypes.USER_DATA,
      get_currentEvent: getterTypes.CURRENT_EVENT,
      get_currentEventGuests: getterTypes.CURRENT_EVENT_GUESTS,
      get_currentEventPresents: getterTypes.CURRENT_EVENT_PRESENTS,
    }),
    currentEvent() {
      return this.get_currentEvent || {};
    },
    eventID() {
      return this.currentEvent.id;
    },
    currentEventGuests() {
      return JSON.parse(JSON.stringify(this.get_currentEventGuests));
    },
    isMobile() {
      return this.windowWidth <= 902;
    },
    getGuestsShowMoreTxt() {
      let count = this.currentEventGuests.length;
      if (this.isMobile) {
        return this.$t(`createEvent.${this.eventType}_show_all_guests`, { guests_count: count });
      }

      count -= 4;
      return this.$tc(`createEvent.${this.eventType}_show_more_guest`, count > 1 ? count : 1, { guests_count: count });
    },
    getPresentsShowMoreTxt() {
      let count = this.currentEventPresents.length;
      if (this.isMobile) {
        return this.$t(`createEvent.show_all_presents`, { presents_count: count });
      }

      count -= 4;
      return this.$tc(`createEvent.show_more_present`, count > 1 ? count : 1, { presents_count: count });
    },
    currentEventGuestsLargeList() {
      let list = this.currentEventGuests;
      if (this.windowWidth > 902) {
        list = this.currentEventGuests.slice(4 - this.currentEventGuests.length);
      }

      return list;
    },
    currentEventGuestsShortList() {
      return this.currentEventGuests.slice(0, 4);
    },
    currentEventPresents() {
      return JSON.parse(JSON.stringify(this.get_currentEventPresents));
    },
    currentEventPresentsLargeList() {
      let list = this.currentEventPresents;
      if (this.windowWidth > 902) {
        list = this.currentEventPresents.slice(4 - this.currentEventPresents.length);
      }

      return list;
    },
    currentEventPresentsShortList() {
      return this.currentEventPresents.slice(0, 4);
    },
    wizardText() {
      let text = '';
      if (this.eventType === 'anniversary') {
        if (this.step === 1) {
          text = this.$t('createEvent.create_private_party');
        } else if (this.step === 2) {
          text = this.$t('createEvent.create_list_guests');
        } else {
          text = this.$t('createEvent.create_list_presents');
        }
      } else {
        text = this.step === 1 ? this.$t('createEvent.create_ss') : this.$t('createEvent.create_list_participants');
      }

      return text;
    },
    isAddMe() {
      const result = this.currentEventGuests.filter(event => event.user.username === this.userProfile.username);
      return result.length;
    },
  },
  data() {
    return {
      eventType: this.$route.params.eventType,
      step: 0,
      maxSteps: this.$route.params.eventType === 'secret-santa' ? 2 : 3,
      eventLoaded: false,
      guestsLoaded: false,
      isShowGuestsFullList: false,
      presentsLoaded: false,
      isShowPresentsFullList: false,
      eventFullCreated: false,
      windowWidth: window.innerWidth,
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
  created() {
    this.$eventHub.$on('changeNewEventStep', this.changeNewEventStep);
    window.addEventListener('resize', this.onResize);
  },
  mounted() {
    this.initFirstStep();
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    initFirstStep() {
      if (this.eventType === 'secret-santa') {
        this.getCurrentSS();
      } else {
        this.getCurrentAnniversary();
      }

      this.step = this.$route.query.step ? Number(this.$route.query.step) : 1;
    },
    getCurrentAnniversary() {
      this.$store.dispatch(actionTypes.GET_CURRENT_ANNIVERSARY).then(resp => {
        this.eventLoaded = true;
        if (resp) {
          if (this.step === 2) {
            this.getGuestsList();
          } else if (this.step === 3) {
            this.getPresentsList();
          }
        } else if (!resp && this.step !== 1) {
          this.step = 1;
          this.$router.push({ query: { step: 1 } });
        }
      });
    },
    getCurrentSS() {
      this.$store.dispatch(actionTypes.GET_CURRENT_SS).then(resp => {
        this.eventLoaded = true;
        if (resp) {
          if (this.step === 2) {
            this.getGuestsList();
          } else if (this.step === 3) {
            this.getPresentsList();
          }
        } else if (!resp && this.step !== 1) {
          this.step = 1;
          this.$router.push({ query: { step: 1 } });
        }
      });
    },
    backStep() {
      this.changeNewEventStep(this.step - 1);
    },
    changeNewEventStep(val) {
      this.step = val;
      this.$router.push({ query: { step: this.step } });

      if (val === 2) {
        this.isShowPresentsFullList = false;
        this.getGuestsList();
      } else if (val === 3) {
        this.isShowGuestsFullList = false;
        this.getPresentsList();
      } else {
        this.isShowPresentsFullList = false;
        this.isShowGuestsFullList = false;
      }
    },
    hideShowGuestsFullList(val = false) {
      this.isShowGuestsFullList = val;
    },
    hideShowPresentsFullList(val = false) {
      this.isShowPresentsFullList = val;
    },
    getGuestsList() {
      const getGuestsAction =
        this.eventType === 'secret-santa' ? actionTypes.GET_SS_GUESTS : actionTypes.GET_ANNIVERSARY_GUESTS;
      this.$store.dispatch(getGuestsAction, this.eventID).then(() => {
        this.guestsLoaded = true;
      });
    },
    getPresentsList() {
      this.$store.dispatch(actionTypes.GET_ANNIVERSARY_PRESENTS, this.eventID).then(() => {
        this.presentsLoaded = true;
      });
    },
    next() {
      if (this.step === 1) {
        this.$eventHub.$emit('createEvent');
      } else if (this.step < this.maxSteps) {
        this.changeNewEventStep(this.step + 1);
      } else if (this.eventType === 'anniversary') {
        this.eventFullCreated = true;
        document.getElementsByTagName('body')[0].classList.add('active-modal');
      } else if (this.currentEventGuests.length < 3) {
        this.$snotify.error(this.$t('createEvent.min_participants_msg'));
      } else if (this.eventType === 'secret-santa' && !this.isAddMe) {
        this.$snotify.confirm(this.$t('createEvent.add_yourself_err_msg'), '', {
          timeout: -1,
          buttons: [
            {
              text: this.$t('createEvent.add_yourself_err_btn_txt'),
              action: toast => {
                this.$eventHub.$emit('add-me');
                this.$snotify.remove(toast.id);
              },
              bold: true,
            },
          ],
        });
      } else {
        this.eventFullCreated = true;
        document.getElementsByTagName('body')[0].classList.add('active-modal');
      }
    },
    confirmRemoveEvent() {
      const msg = this.$t('createEvent.delete_event_confirmation_msg', { name: this.get_currentEvent.name });
      this.$snotify.confirm(msg, '', {
        timeout: -1,
        buttons: [
          {
            text: this.$t('createEvent.delete'),
            action: toast => {
              this.removeEvent();
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
    removeEvent() {
      const deleteEventAction =
        this.eventType === 'secret-santa' ? actionTypes.DELETE_SS_EVENT : actionTypes.DELETE_ANNIVERSARY_EVENT;
      const currentStep = this.step;
      this.step = 0;
      this.$store.dispatch(deleteEventAction, this.eventID).then(() => {
        if (currentStep === 1) {
          this.$router.push({ query: { step: this.step } });
        }

        this.step = 1;
        this.$store.commit(mutationTypes.CLEAR_CURRENT_EVENT_STATE);
        this.initFirstStep();
      });
    },
    finishEvent() {
      this.step = 0;
      this.$store.commit(mutationTypes.CLEAR_CURRENT_EVENT_STATE);
      this.closeSuccessModal();
      router.push({ name: 'MyEvents' });
    },
    closeSuccessModal() {
      this.eventFullCreated = false;
      document.getElementsByTagName('body')[0].classList.remove('active-modal');
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/pages/NewEvent.scss';
</style>
