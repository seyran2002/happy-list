<template>
  <section class="my-events-page" :class="{ 'no-grid-columns': currentEventGifts && currentEventGifts.length }">
    <molecule-my-events-search
      v-if="anniversaryEvents?.length"
      @set-filter-by="setFilterBy"
      @set-filter-str="setFilterStr"
    />

    <p v-if="!anniversaryEvents?.length" class="my-events-page__no-events">
      {{ $t('events.noAnniversaryEvents') }}
      <router-link to="/create-event/anniversary">{{ $t('common.here') }}</router-link>
    </p>

    <div class="my-events-description-wrapper">
      <molecule-show-more-texts v-if="currentEvent.description" :paragraph="description" />
    </div>

    <aside v-if="showEventsList" class="my-events-items">
      <ul class="my-events-list" :class="{ 'max-height': anniversaryEvents?.length >= 8 }">
        <molecule-my-event-item
          v-for="event in anniversaryEvents"
          :key="`event-item-link-${event.id}`"
          :ref="`event-item-link-${event.id}`"
          :event-item="event"
          @update-events="getAnniversaryEvents"
          @show-edit-modal="showEditModal"
          @close-all-dropdowns="closeAllDropdowns"
        />
      </ul>
    </aside>

    <router-view />

    <organism-modal v-show="isModalShown" class="base-modal" @close="closeModal">
      <template v-slot:body>
        <organism-edit-event v-if="eventToEdit" :event="eventToEdit" />
      </template>
    </organism-modal>
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
import MoleculeMyEventsSearch from '@/components/molecules/MoleculeMyEventsSearch';
import MoleculeMyEventItem from '@/components/molecules/MoleculeMyEventItem';

export default {
  name: 'EventsInvited',
  mixins: [windowSize, filterGuestsGiftsProvide, closeAllDropdowns],
  components: {
    AtomSelectOption,
    MoleculeMyEventsSearch,
    MoleculeMyEventItem,
    MoleculeShowMoreTexts: () => import('../../components/molecules/MoleculeShowMoreTexts'),
    OrganismMyEventContent: () => import('@/components/organisms/OrganismMyEventContent'),
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismEditEvent: () => import('@/components/organisms/OrganismEventEdit'),
  },
  metaInfo() {
    return {
      title: this.$t('events.anniversary'),
      meta: [{ vmid: 'description', name: 'description', content: 'This is Anniversary Events page' }],
    };
  },
  data() {
    return {
      isModalShown: false,
      eventToEdit: null,
    };
  },
  computed: {
    ...mapGetters({
      anniversaryEvents: getterTypes.ANNIVERSARY_EVENTS,
      currentEvent: getterTypes.CURRENT_EVENT,
      currentEventGifts: getterTypes.CURRENT_EVENT_PRESENTS,
    }),
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
  },
  created() {
    this.$eventHub.$on('updated-event', () => {
      this.closeModal();
      this.getAnniversaryEvents();
    });
  },
  mounted() {
    this.getAnniversaryEvents();
  },
  methods: {
    getAnniversaryEvents() {
      this.$store.dispatch(actionTypes.GET_ANNIVERSARY_EVENTS);
    },
    showModal() {
      this.isModalShown = true;
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.isModalShown = false;
      document.body.classList.remove('modal-open');
    },
    showEditModal(event) {
      this.eventToEdit = event;
      this.showModal();
    },
  },
  destroyed() {
    this.$eventHub.$off('updated-event', () => {
      this.closeModal();
      this.getAnniversaryEvents();
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/pages/MyEvents.scss';
</style>
