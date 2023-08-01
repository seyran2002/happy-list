<template>
  <div class="event-type">
    <section class="events-child-block">
      <lazy-load-image
        class="icon-content"
        :class="[`icon-content--${itemIconName}`]"
        :src="require(`@/assets/images/svg/${itemIconName}.svg`)"
        width="200"
        height="200"
        alt=""
      />

      <transition name="guestRow2" mode="out-in">
        <p class="hg-description-content">
          {{ itemDescription }}

          <atom-link :href="`faq/${itemHelpTag}`" target="_blank" text-color="text-red-color" tag="a">{{ $t('createEvent.here') }}
          </atom-link>
        </p>
      </transition>

      <atom-link
        class="event-type-btn btn"
        text-color="text-white-color"
        tag="button"
        text-size="text-14"
        background="btn-gradient-color"
        font-family="font-source-bold"
        @click.native="goToEvent(itemPath)"
        >{{ itemBtnTxt }}
      </atom-link>
    </section>
  </div>
</template>

<script>
import AtomLink from '@/components/atoms/AtomLink';
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';
import mutationTypes from '@/store/types/mutation-types';

export default {
  name: 'MoleculeCreateEvent',
  components: {
    AtomLink,
  },
  props: {
    itemDescription: String,
    itemIconName: String,
    itemBtnTxt: String,
    itemHelpTag: String,
    itemPath: String,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.IS_LOGGED_IN,
    }),
  },
  methods: {
    goToEvent(eventPath) {
      const route = this.$router.resolve({ path: `create-event/${eventPath}` });
      if (!this.isLoggedIn) {
        this.$store.commit(mutationTypes.SET_REDIRECT_URL, route.href);
        this.$eventHub.$emit('show-modal-auth');
      } else {
        this.$router.push({ path: route.href });
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/molecules/MoleculeEventType.scss';
</style>
