<template>
  <section class="my-events-page" :class="{ 'no-grid-columns': currentEventGifts && currentEventGifts.length }">
    <molecule-my-events-search
      v-if="invitedEvents?.length"
      @set-filter-by="setFilterBy"
      @set-filter-str="setFilterStr"
    />

    <p v-if="!invitedEvents?.length" class="my-events-page__no-events">{{ $t('events.noInvitedEvents') }}</p>

    <div class="my-events-description-wrapper">
      <molecule-show-more-texts v-if="currentEvent.description" :paragraph="description" />
    </div>

    <div v-if="checkInvited" class="event-decline-accept mt-20">
      <atom-link
        class="btn-small"
        tag="button"
        text-size="text-14"
        background="bg-white"
        font-family="font-source-regular"
        @click.native="answerInvitation(2)"
        >{{ $t('events.decline') }}
      </atom-link>

      <atom-link
        class="btn-small ml-15"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        background="btn-gradient-color"
        font-family="font-source-bold"
        @click.native="answerInvitation(1)"
        >{{ $t('events.accept') }}
      </atom-link>
    </div>
    <aside v-if="showEventsList" class="my-events-items">
      <ul class="my-events-list" :class="{ 'max-height': invitedEvents?.length >= 8 }">
        <molecule-my-event-item
          v-for="event in invitedEvents.sort((a, b) =>
            a.event.datetime > b.event.datetime ? -1 : b.event.datetime > a.event.datetime ? 1 : 0
          )"
          :key="`event-item-link-${event.event.id}`"
          :ref="`event-item-link-${event.event.id}`"
          :event-item="event.event"
          :blinking="event.accepted == 0"
          @close-all-dropdowns="closeAllDropdowns"
        />
      </ul>
    </aside>

    <router-view />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import actionTypes from '@/store/types/action-types';
import getterTypes from '@/store/types/getter-types';
import windowSize from '@/mixins/window-size';
import filterGuestsGiftsProvide from '@/mixins/filter-guests-gifts-provide';
import closeAllDropdowns from '@/mixins/close-all-dropdowns';
import AtomSelectOption from '@/components/atoms/AtomSelectOption';
import AtomLink from '@/components/atoms/AtomLink';
import MoleculeMyEventsSearch from '@/components/molecules/MoleculeMyEventsSearch';
import MoleculeMyEventItem from '@/components/molecules/MoleculeMyEventItem';

export default {
  name: 'EventsInvited',
  mixins: [windowSize, filterGuestsGiftsProvide, closeAllDropdowns],
  components: {
    AtomSelectOption,
    MoleculeMyEventsSearch,
    MoleculeMyEventItem,
    AtomLink,
    MoleculeShowMoreTexts: () => import('../../components/molecules/MoleculeShowMoreTexts'),
    OrganismMyEventContent: () => import('@/components/organisms/OrganismMyEventContent'),
  },
  metaInfo() {
    return {
      title: this.$t('events.invited'),
      meta: [{ vmid: 'description', name: 'description', content: 'This is Invited Events page' }],
    };
  },
  computed: {
    ...mapGetters({
      userData: getterTypes.USER_DATA,
      get_invitedEvents: getterTypes.MY_INVITED_EVENTS_LIST,
      currentEvent: getterTypes.CURRENT_EVENT,
      currentEventGifts: getterTypes.CURRENT_EVENT_PRESENTS,
    }),
    invitedEvents() {
      return JSON.parse(JSON.stringify(this.get_invitedEvents));
    },
    description() {
      return {
        text: this.currentEvent.description,
      };
    },
    showEventsList() {
      if (this.isMobile || this.isTablet) {
        return Object.keys(this.currentEvent).length === 0;
      }
      return true;
    },
    checkInvited() {
      if (this.currentEvent.id) {
        const singleEvent = this.invitedEvents.find(
          v => Number(v.event.id) === Number(this.currentEvent.id) && Number(v.accepted) === 0
        );
        if (singleEvent) {
          this.guest_id = singleEvent.id;
          return true;
        }
        return false;
      }
      return false;
    },
  },
  data() {
    return {
      guest_id: null,
      isInvitation: false,
    };
  },
  watch: {
    getInvitations: {
      handler(val) {
        if (val) {
          const you = val.find(
            v => Number(v.user_id) === Number(this.userData.id) && Number(v.event_id) === Number(this.$route.params.id)
          );
          if (you) {
            this.guest_id = you.id;
            this.isInvitation = true;
          } else {
            this.isInvitation = false;
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    answerInvitation(accepted) {
      const payload = {
        accepted,
        guest_id: this.guest_id,
      };
      this.$store
        .dispatch(actionTypes.ANSWER_INVITATION, payload)
        .then(message => {
          this.$snotify.success(message);
        })
        .catch(() => {
          this.$snotify.error('error');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/pages/MyEvents.scss';
</style>
