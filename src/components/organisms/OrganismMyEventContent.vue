<template>
  <div class="my-event-content-wrapper">
    <div v-if="isTablet || isMobile" class="my-event-content-btns">
      <atom-button
        class="my-event-content-btn"
        :class="{ active: componentForMobile === 'OrganismMyEventGuests' }"
        background="btn-gradient-color"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        @click.native="changeComponentForMobile('OrganismMyEventGuests')"
      >
        {{ $t('faq.Guests') }}
      </atom-button>
      <atom-button
        v-if="!isSecretSanta || currentEventGifts?.length"
        class="my-event-content-btn"
        :class="{ active: componentForMobile === 'OrganismMyEventGifts' }"
        background="btn-gradient-color"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        @click.native="changeComponentForMobile('OrganismMyEventGifts')"
      >
        {{ $t('faq.Presents') }}
      </atom-button>
    </div>
    <article class="my-event-content">
      <main
        class="event-content-guests-gifts"
        :class="{ 'no-grid-columns': !currentEventGifts?.length || isTablet || isMobile }"
      >
        <organism-my-event-guests
          v-if="!isTablet && !isMobile"
          :event-type="isSecretSanta ? 'secret-santa' : 'anniversary'"
        />

        <organism-my-event-gifts v-if="!isSecretSanta && !isTablet && !isMobile" />

        <component :is="componentForMobile" v-if="isTablet || isMobile" />

        <organism-modal v-if="isInvitation" class="base-modal gift-modal" @close="isInvitation = false">
          <template v-slot:body>
            <organism-invited-event-popup :guest-id="guest_id" @close="isInvitation = false" />
          </template>
        </organism-modal>
      </main>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import actionTypes from '@/store/types/action-types';
import windowSize from '@/mixins/window-size';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomButton from '@/components/atoms/AtomButton';
import AtomLink from '@/components/atoms/AtomLink';

export default {
  name: 'OrganismMyEventContent',
  mixins: [windowSize],
  components: {
    AtomTitle,
    AtomButton,
    AtomLink,
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismInvitedEventPopup: () => import('@/components/organisms/OrganismInvitedEventPopup'),
    OrganismMyEventGuests: () => import('./OrganismMyEventGuests'),
    OrganismMyEventGifts: () => import('./OrganismMyEventGifts'),
  },
  data() {
    return {
      componentForMobile: 'OrganismMyEventGuests',
      isInvitation: false,
      guest_id: null,
    };
  },
  mounted() {
    this.$watch(
      vm => [vm.invitedEvents, vm.currentEvent],
      () => {
        if (this.invitedEvents) {
          const singleEvent = this.invitedEvents.find(
            v => Number(v.event.id) === Number(this.currentEvent.id) && Number(v.accepted) === 0
          );
          if (singleEvent) {
            this.guest_id = singleEvent.id;
            this.isInvitation = true;
          } else {
            this.isInvitation = false;
          }
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );
  },
  computed: {
    ...mapGetters({
      currentEvent: getterTypes.CURRENT_EVENT,
      userData: getterTypes.USER_DATA,
      invitedEvents: getterTypes.MY_INVITED_EVENTS_LIST,
      currentEventGuests: getterTypes.CURRENT_EVENT_GUESTS,
      currentEventGifts: getterTypes.CURRENT_EVENT_PRESENTS,
    }),
    eventDate() {
      if (this.currentEvent) {
        const dateStr = this.currentEvent.datetime.split(' ')[0];
        const day = new Date(dateStr).getDay();
        return `${dateStr} (${this.$t('profile.calendar.daysShort')[day]})`;
      }
    },
    eventTime() {
      if (this.currentEvent) {
        const padTo2Digits = num => String(num).padStart(2, '0');
        const date = new Date(this.currentEvent.datetime);
        return `${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`;
      }
    },
    isSecretSanta() {
      return ['EventSecretSanta', 'EventSecretSanta'].includes(this.$route.name);
    },
  },
  watch: {
    componentForMobile(val) {
      const filterBy = {
        OrganismMyEventGuests: 'guests',
        OrganismMyEventGifts: 'gifts',
      };

      this.$eventHub.$emit('setup-search', { filterBy: filterBy[val], filterStr: '' });
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
    changeComponentForMobile(name) {
      if (name === this.componentForMobile) {
        return false;
      }

      this.componentForMobile = name;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/organisms/OrganismMyEventContent.scss';
</style>
