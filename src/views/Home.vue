<template>
  <div class="home">
    <div class="mt-170 happy-peoples-block" style="min-height: 311px">
      <div class="block-image-main">
        <molecule-text-block
          :width="mainBlock1.width"
          :title="mainBlock1.title"
          :sub-title-light="mainBlock1.subTitleLight"
          :sub-title="mainBlock1.subTitle"
          :paragraph="mainBlock1.paragraph"
          :button="mainBlock1.button"
        />
        <img
          :src="require(`@/assets/images/svg/happyPeoples.svg`)"
          class="icon-content"
          width="311"
          height="241"
          alt="Happy peoples"
        />
      </div>
    </div>

    <div class="mt-170 how-it-work">
      <organism-boxes :title="$t('home.howItWorks')" tag="span" :boxes="boxes1" />
    </div>

    <organism-boxes
      v-if="lazyLoad"
      class="mt-170"
      :title="$t('home.ourModestAchievements')"
      tag="span"
      :transform="true"
      :boxes="boxes2"
    />

    <organism-block-image class="mt-170" :main-block="mainBlock2" :items-center="true">
      <aside class="icon-wrapper icon-wrapper--happy-person happy-person">
        <lazy-load-image
          :viewportDistance="100"
          :src="require(`@/assets/images/svg/happyPerson.svg`)"
          class="icon-content"
          width="531"
          height="573"
        />
      </aside>
    </organism-block-image>

    <organism-block-image class="mt-170" :main-block="mainBlock3" :items-center="true" :items-reverse="true">
      <aside class="icon-wrapper icon-wrapper--sleigh-gift">
        <lazy-load-image
          :src="require(`@/assets/images/svg/sleighGift.svg`)"
          class="icon-content sleigh-gift"
          width="712"
          height="678"
        />
      </aside>
    </organism-block-image>
  </div>
</template>

<script>
import actionTypes from '../store/types/action-types';
import getterTypes from '../store/types/getter-types';

export default {
  name: 'home-page',
  components: {
    OrganismBlockImage: () => import('../components/organisms/OrganismBlockImage'),
    MoleculeTextBlock: () => import('../components/molecules/MoleculeTextBlock'),
    OrganismBoxes: () => import('../components/organisms/OrganismBoxes'),
  },
  data() {
    return {
      lazyLoad: false,
    };
  },
  created() {
    const that = this;
    window.addEventListener('scroll', () => {
      if (!that.lazyLoad) {
        this.$store.dispatch(actionTypes.GET_COUNTS);
        that.lazyLoad = true;
      }
    });
  },
  computed: {
    mainBlock1() {
      return {
        width: 394,
        title: {
          tag: 'h1',
          value: this.$t('home.happyList'),
          textSize: 'text-60',
          fontFamily: 'font-source-bold',
        },
        subTitleLight: {
          tag: 'h2',
          value: this.$t('home.subTitleHappyList'),
          textSize: 'text-24',
          textColor: 'text-second-color',
          fontFamily: 'font-source-light',
        },
        subTitle: {
          tag: 'h3',
          value: this.$t('home.subTitleParagraphHappyList'),
          textSize: 'text-19',
          textColor: 'text-second-color',
          fontFamily: 'font-source-semiBold',
        },
        paragraph: {
          value: this.$t('home.paragraphHappyList'),
          fontFamily: 'font-source-regular',
        },
        button: {
          tag: 'router-link',
          pathName: 'Faq',
          value: this.$t('home.instructionButton'),
          textSize: 'text-14',
          textColor: 'text-white-color',
          background: 'btn-gradient-color',
          fontFamily: 'font-source-bold',
        },
      };
    },
    mainBlock2() {
      return {
        imageName: 'happyPerson',
        width: 551,
        title: {
          tag: 'h2',
          value: this.$t('home.birthdayWeddingSimilar'),
          textSize: 'text-60',
          fontFamily: 'font-source-bold',
        },
        paragraph: {
          value: this.$t('home.birthdayWeddingSimilarParagraph'),
          fontFamily: 'font-source-regular',
        },
        button: {
          tag: 'router-link',
          pathName: 'CreateEvent',
          value: this.$t('home.create'),
          textSize: 'text-14',
          textColor: 'text-white-color',
          background: 'btn-gradient-color',
          fontFamily: 'font-source-bold',
        },
      };
    },
    mainBlock3() {
      return {
        width: 551,
        title: {
          tag: 'h2',
          value: this.$t('home.secretSanta'),
          textSize: 'text-60',
          fontFamily: 'font-source-bold',
        },
        paragraph: {
          value: this.$t('home.secretSantaText'),
          fontFamily: 'font-source-regular',
        },
        button: {
          tag: 'router-link',
          pathName: 'CreateEvent',
          value: this.$t('home.create'),
          textSize: 'text-14',
          textColor: 'text-white-color',
          background: 'btn-gradient-color',
          fontFamily: 'font-source-bold',
        },
      };
    },

    boxes1() {
      return [
        {
          widthImg: 170,
          heightImg: 170,
          width: 'w-324',
          image: 'calendarRound',
          number: 1,
          subTitle: this.$t('home.createAnEvent'),
          text: this.$t('home.createAnEventText'),
        },
        {
          widthImg: 170,
          heightImg: 170,
          width: 'w-324',
          image: 'letterRound',
          number: 2,
          subTitle: this.$t('home.inviteGuests'),
          text: this.$t('home.inviteGuestsText'),
        },
        {
          widthImg: 170,
          heightImg: 170,
          width: 'w-324',
          image: 'personRound',
          number: 3,
          subTitle: this.$t('home.makeYourWishList'),
          text: this.$t('home.makeYourWishListText'),
        },
      ];
    },
    boxes2() {
      return [
        {
          widthImg: 208,
          heightImg: 179,
          image: 'balloon1',
          roller: this.$store.getters[getterTypes.GET_COUNTS].events,
          text: this.$t('home.ourModestAchievementsText1'),
        },
        {
          widthImg: 208,
          heightImg: 200,
          image: 'balloon2',
          roller: this.$store.getters[getterTypes.GET_COUNTS].users,
          mT: '-mt-21',
          text: this.$t('home.ourModestAchievementsText2'),
        },
        {
          widthImg: 193,
          heightImg: 196,
          image: 'balloon3',
          roller: this.$store.getters[getterTypes.GET_COUNTS].presents,
          mT: '-mt-17',
          text: this.$t('home.ourModestAchievementsText3'),
        },
      ];
    },
  },
  metaInfo() {
    return {
      title: this.$t('meta.home.title'),
      meta: [{ vmid: 'description', name: 'description', content: this.$t('meta.home.description') }],
      htmlAttrs: {
        lang: this.$t('meta.lang'),
      },
    };
  },
};
</script>

<style lang="scss">
@import '../assets/styles/pages/Home';
</style>
