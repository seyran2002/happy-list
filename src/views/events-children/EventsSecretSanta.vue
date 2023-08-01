<template>
  <section class="my-events-page">
    <p v-if="!ssEvents?.length" class="my-events-page__no-events">
      {{ $t('events.noSSEvents') }}
      <router-link to="/create-event/secret-santa">{{ $t('common.here') }}</router-link>
    </p>

    <div class="my-events-description-wrapper">
      <molecule-show-more-texts v-if="currentEvent.description" :paragraph="description" />
    </div>

    <aside v-if="showEventsList" class="my-events-items">
      <ul class="my-events-list" :class="{ 'max-height': ssEvents?.length >= 8 }">
        <molecule-my-event-item
          v-for="event in ssEvents"
          :key="`event-item-link-${event.id}`"
          :ref="`event-item-link-${event.id}`"
          :event-item="event"
          @show-edit-modal="showEditModal"
          @close-all-dropdowns="closeAllDropdowns"
        />
      </ul>
    </aside>

    <router-view />

    <organism-modal v-show="isModalShown" class="base-modal" @close="closeModal">
      <template v-slot:body>
        <organism-edit-event v-if="eventToEdit" :event="eventToEdit" event-type="secret-santa" />
      </template>
    </organism-modal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import actionTypes from '@/store/types/action-types';
import getterTypes from '@/store/types/getter-types';
import windowSize from '@/mixins/window-size';
import closeAllDropdowns from '@/mixins/close-all-dropdowns';
import MoleculeMyEventItem from '@/components/molecules/MoleculeMyEventItem';

export default {
  name: 'EventsSecretSanta',
  mixins: [windowSize, closeAllDropdowns],
  components: {
    MoleculeMyEventItem,
    MoleculeShowMoreTexts: () => import('../../components/molecules/MoleculeShowMoreTexts'),
    OrganismMyEventContent: () => import('@/components/organisms/OrganismMyEventContent'),
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismEditEvent: () => import('@/components/organisms/OrganismEventEdit'),
  },
  metaInfo() {
    return {
      title: this.$t('home.secretSanta'),
      meta: [{ vmid: 'description', name: 'description', content: 'This is the Secret Santa events page' }],
    };
  },
  computed: {
    ...mapGetters({
      ssEvents: getterTypes.SS_EVENTS,
      currentEvent: getterTypes.CURRENT_EVENT,
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
  data() {
    return {
      isModalShown: false,
      eventToEdit: null,
    };
  },
  created() {
    this.$eventHub.$on('get-ss-events', this.getSSEvents);
    this.$eventHub.$on('updated-event', () => {
      this.closeModal();
      this.getSSEvents();
    });
  },
  mounted() {
    this.getSSEvents();
  },
  methods: {
    getSSEvents() {
      this.$store.dispatch(actionTypes.GET_SS_EVENTS);
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
    this.$eventHub.$off('updated-event', this.getSSEvents);
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/pages/MyEvents.scss';
</style>
