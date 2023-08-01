<template>
  <div class="faq-items">
    <molecule-faq-item
      v-for="item in faqItems"
      :key="`faq-item-${item.id}`"
      :item-id="item.id"
      :item-title="item.title"
      :item-details="item.details"
      :item-icon-name="item.iconName"
    />
  </div>
</template>

<script>
import MoleculeFaqItem from '@/components/molecules/MoleculeFaqItem';

export default {
  name: 'OrganismFaq',
  components: {
    MoleculeFaqItem,
  },
  computed: {
    faqItems() {
      return [
        {
          id: 'createAnniversaryEvent',
          iconName: 'happyPerson',
          title: this.$i18n.t("faq['How To Create An Anniversary Event']"),
          details: `
          <p><b>${this.$i18n.t("faq['Step 1']")}</b> ${this.$i18n.t("faq['Fill in all the fields of the form']")}</p>
          <p><b>${this.$i18n.t("faq['Step 2']")}</b> ${this.$i18n.t("faq['Make a list of participants']")}</p>
          <p><b>${this.$i18n.t("faq['Step 3']")}</b> ${this.$i18n.t(
            "faq['Make a list of presents you want to receive']"
          )}</p>
          <p><b>${this.$i18n.t("faq['Step 4']")}</b> ${this.$i18n.t("faq['Finalize your event']")}</p>
          <p>${this.$i18n.t("faq['After getting invitations to your party']")}</p>
        `,
        },
        {
          id: 'howToCreateSSEvent',
          iconName: 'sleighGift',
          title: this.$i18n.t("faq['How to create a Secret Santa event']"),
          details: `
          <p><b>${this.$i18n.t("faq['Step 1']")}</b> ${this.$i18n.t("faq['Fill in all the fields of the form']")}</p>
          <p><b>${this.$i18n.t("faq['Step 2']")}</b> ${this.$i18n.t("faq['Make a list of participants']")}</p>
          <p><b>${this.$i18n.t("faq['Step 3']")}</b> ${this.$i18n.t("faq['Click on']")} ${this.$i18n.t(
            "faq['Create the event and send the notifications']"
          )} ${this.$i18n.t("faq['This will finalize your event']")}</p>
        `,
        },
        {
          id: 'rulesOfSSEvent',
          iconName: 'santaLetter',
          title: this.$i18n.t("faq['Rules of Secret Santa event']"),
          details: `
          <p>${this.$i18n.t("faq['Here are the rules of Secret Santa']")}</p>
          <p>${this.$i18n.t("faq['After creating the list of participants']")}<br>
          ${this.$i18n.t("faq['Later, during the event, all the gifts should be stored']")}<br>
          ${this.$i18n.t("faq['One of guests must come and take']")}<br>
          ${this.$i18n.t("faq['Here comes the most interesting part']")}<br>
          ${this.$i18n.t("faq['To prevent this process from infinity loop']")}</p>
        `,
        },
        {
          id: 'invitedToTheEventGuest',
          iconName: 'letterRound',
          title: this.$i18n.t("faq['You are invited to the event, what next']"),
          details: `
          <p>${this.$i18n.t("faq['You will get an email or an SMS about invitation']")}</p>
          <p>${this.$i18n.t("faq['What to do if you are a new user']")}</p>
          <p>${this.$i18n.t("faq['Following that link you will find page with 2 forms']")}</p>
        `,
        },
        {
          id: 'addPresentAndGuest',
          iconName: 'add guest',
          title: this.$i18n.t("faq['Add a new guest or a present after finalizing the event']"),
          details: `
          <p>${this.$i18n.t("faq['First, you must login from']")}</p>
          <p>${this.$i18n.t("faq['Go to']")} ${this.$i18n.t("faq['My events']")}. ${this.$i18n.t(
            "faq['Choose the event you want to add a guest']"
          )} ${this.$i18n.t("faq['Anniversary Event']")}. ${this.$i18n.t("faq['You should click on']")} ${this.$i18n.t(
            "faq['Description']"
          )} ${this.$i18n.t("faq['Button in appropriate row']")}</p>
          <p>${this.$i18n.t("faq['To add a new guest you must click on']")} ${this.$i18n.t(
            "faq['Add a guest']"
          )} ${this.$i18n.t("faq['Button and fill the form in the opened popup']")}</p>
          <p>${this.$i18n.t("faq['To add a new present you must click on']")} ${this.$i18n.t(
            "faq['Add the present']"
          )} ${this.$i18n.t("faq['Button and fill the form in the opened popup']")}</p>
        `,
        },
        {
          id: 'hidePresentAndGuest',
          iconName: 'question',
          title: this.$i18n.t("faq['Hide the present or the guest from everybody']"),
          details: `
          <p>${this.$i18n.t("faq['First, you must login from']")}</p>
          <p>${this.$i18n.t("faq['Follow to']")} ${this.$i18n.t("faq['My events']")}${this.$i18n.t("faq['page']")}<br>
          🎯 ${this.$i18n.t("faq['If you are an event creator']")} <br>
          ${this.$i18n.t("faq['Choose the event where you want to hide a present or a guest']")} ${this.$i18n.t(
            "faq['Anniversary Event']"
          )}. ${this.$i18n.t("faq['You should click on']")} ${this.$i18n.t("faq['Description']")} ${this.$i18n.t(
            "faq['Button in appropriate row']"
          )} <br>
          ✅ ${this.$i18n.t("faq['To make a guest hidden you must click on']")}✅ ${this.$i18n.t(
            "faq['checkbox in appropriate row under']"
          )} ${this.$i18n.t("faq['Guests']")}${this.$i18n.t("faq['After this no one will be able to see']")}<br>
          ✅ ${this.$i18n.t("faq['For hiding a choice of a present you should click on']")}✅ ${this.$i18n.t(
            "faq['checkbox in appropriate row under']"
          )} ${this.$i18n.t("faq['Presents']")} <br>

          🎯 ${this.$i18n.t("faq['If you are a guest']")} <br>
          ✅ ${this.$i18n.t(
            "faq['To hide yourself from other guests in a particular event you must find that event in a list of events under']"
          )} ${this.$i18n.t("faq['Invited Event']")}. ${this.$i18n.t(
            "faq['checkbox in that row. After this no one (except the event creator)']"
          )} <br>
          ✅ ${this.$i18n.t("faq['To make your choice of present hidden, you must click on']")} ${this.$i18n.t(
            "faq['Description']"
          )}, ${this.$i18n.t("faq['button in appropriate row of event under']")} ${this.$i18n.t(
            "faq['Invited Event']"
          )} ${this.$i18n.t(
            "faq['title. In the new page you should find the present you want to hide under']"
          )} ${this.$i18n.t("faq['Presents']")}${this.$i18n.t("faq['title and click on']")}✅ ${this.$i18n.t(
            "faq['checkbox in same row. After this no one will be able to see']"
          )}<br>
          ${this.$i18n.t("faq['Important']")} ${this.$i18n.t(
            "faq['If you are a member of a group present, then anyone']"
          )}</p>
        `,
        },
      ];
    },
  },
};
</script>
