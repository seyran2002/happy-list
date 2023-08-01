<template>
  <div ref="eventsLinks" class="events-links">
    <router-link
      v-for="({ to, text }, index) in eventsLinks"
      v-slot="{ navigate, isActive }"
      :key="`event-link-${index}`"
      :ref="`eventLink${to}`"
      custom
      tag="atom-button"
      :to="{ name: to }"
      :exact="to === 'MyEvents'"
    >
      <atom-button
        class="events-link btn"
        :class="[{ 'router-link-active': isActive }, { blinking: checkInvited && index === 2 }]"
        font-family="font-source-regular"
        text-size="text-14"
        @click.native="navigate"
      >
        {{ text }}
      </atom-button>
    </router-link>
  </div>
</template>

<script>
import AtomButton from '@/components/atoms/AtomButton';
import windowSize from '@/mixins/window-size';
import { mapGetters } from 'vuex';
import getterTypes from '../../store/types/getter-types';

export default {
  name: 'MoleculeEventsLinks',
  mixins: [windowSize],
  components: {
    AtomButton,
  },
  props: {
    eventsLinks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      invitedEvents: getterTypes.MY_INVITED_EVENTS_LIST,
    }),
    currentLinkEl() {
      const routeNameArr = this.$route.name.split(/(?=[A-Z])/);
      routeNameArr[0] = routeNameArr[0] === 'Event' ? 'Events' : routeNameArr[0];

      return routeNameArr.join('');
    },
    checkInvited() {
      const singleEvent = this.invitedEvents.find(v => Number(v.accepted) === 0);
      if (singleEvent) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.scrollEventsLinks();
  },
  watch: {
    currentLinkEl: {
      handler() {
        if (this.isMobile) {
          this.scrollEventsLinks();
        }
      },
    },
  },
  methods: {
    scrollEventsLinks() {
      const currentLinkEL = this.$refs[`eventLink${this.currentLinkEl}`][0].$el;
      currentLinkEL.scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'start' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/molecules/MoleculeEventsLinks.scss';
</style>
