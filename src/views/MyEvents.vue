<template>
  <div class="events">
    <molecule-breadcrumbs :links="breadcrumbsLinks" />

    <atom-title text-size="text-32" :text="$t('pages.myEvents')" />

    <molecule-events-links :events-links="eventsLinks" />

    <organism-modal v-show="invitationModal" class="base-modal" @close="closeInvitationModal">
      <template v-slot:body>
        <organism-link-invitation :invitedEvent="invitedEvent" @close="closeInvitationModal" />
      </template>
    </organism-modal>
    <router-view />
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import mutationTypes from '@/store/types/mutation-types';
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomLink from '@/components/atoms/AtomLink';
import MoleculeBreadcrumbs from '@/components/molecules/MoleculeBreadcrumbs';
import MoleculeEventsLinks from '@/components/molecules/MoleculeEventsLinks';
import actionTypes from '../store/types/action-types';

export default {
  name: 'MyEventsPage',
  components: {
    AtomLink,
    AtomTitle,
    MoleculeBreadcrumbs,
    MoleculeEventsLinks,
    OrganismModal: () => import('@/components/organisms/OrganismModal'),
    OrganismLinkInvitation: () => import('@/components/organisms/OrganismLinkInvitation'),
  },
  data() {
    return {
      invitationModal: false,
      invitedEvent: {},
    };
  },
  metaInfo() {
    return {
      title: 'My Events',
      meta: [{ vmid: 'description', name: 'description', content: 'This is My Events page' }],
    };
  },
  beforeCreate() {
    this.$store.dispatch(actionTypes.GET_MY_INVITED_EVENTS);
    if (localStorage.getItem('event_token')) {
      this.$store
        .dispatch(actionTypes.GET_EVENTS_TOKEN, localStorage.getItem('event_token'))
        .then(data => {
          this.invitedEvent = data;
          this.invitationModal = true;
        })
        .catch(error => {
          this.$snotify.clear();
          this.$snotify.error(`${error.message} 😕`, '', {
            timeout: -1,
            showProgressBar: true,
          });
          localStorage.removeItem('event_token');
        });
    }
  },
  computed: {
    breadcrumbsLinks() {
      return [
        {
          to: '/',
          text: this.$t('pages.home'),
        },
        {
          to: '/events',
          text: this.$t('pages.myEvents'),
        },
      ];
    },
    eventsLinks() {
      return [
        {
          to: 'EventsSecretSanta',
          path: '/events/secret-santa',
          text: this.$t('home.secretSanta'),
        },
        {
          to: 'EventsAnniversary',
          path: '/events/anniversary',
          text: this.$t('events.anniversary'),
        },
        {
          to: 'EventsInvited',
          path: '/events/anniversary',
          text: this.$t('events.invited'),
        },
        {
          to: 'MyEvents',
          path: '/events',
          text: this.$t('pages.myEvents'),
        },
      ];
    },
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.$store.commit(mutationTypes.CLEAR_CURRENT_EVENT_STATE);
      },
    },
  },
  methods: {
    closeInvitationModal() {
      this.invitationModal = false;
      localStorage.removeItem('event_token');
    },
  },
};
</script>

<style scoped></style>
