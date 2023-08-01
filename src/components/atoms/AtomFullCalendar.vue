<template>
  <FullCalendar
    :class="{
      fullFlex: true,
      Cale: true,
      fc: true,
      'fc-media-screen': true,
      'fc-direction-ltr': true,
      'fc-theme-standard': true,
    }"
    class="Cale"
    :options="calendarOptions"
  />
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import listPlugin from '@fullcalendar/list';
import momentPlugin from '@fullcalendar/moment';
import { mapGetters } from 'vuex';
import getterTypes from '@/store/types/getter-types';

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
  },
  props: {
    allEvents: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters({
      userProfile: getterTypes.USER_DATA,
    }),
    userID() {
      return this.userProfile.id;
    },
    calendarOptions() {
      return {
        firstDay: 1,
        plugins: [dayGridPlugin, interactionPlugin, momentPlugin, listPlugin],
        noEventsContent: 'No events to display',
        bootstrapFontAwesome: true,
        headerToolbar: {
          start: ' ,today prev,next title',
          center: '',
          end: '',
        },
        eventClick: this.handleDateClick,
        events: this.allEvents,
        eventDisplay: 'display',
        timeFormat: 'HH:mm',
        eventColor: '#fff',
        navLinks: false,
        locales: allLocales,
        locale: this.$i18n.locale === 'hy' ? 'hy-am' : this.$i18n.locale,
        views: {
          month: {
            titleFormat: 'MMMM YYYY',
          },
        },
        dateClick: this.getDate,
        dayHeaderContent: arg => this.$t('profile.calendar.daysShort')[arg.date.getDay()],
      };
    },
  },
  watch: {
    calendarOptions: {
      handler() {
        this.$nextTick(() => {
          const events = document.getElementsByClassName('fc-event-main-frame');
          for (let i = 0; i < events.length; i++) {
            events[i].setAttribute(
              'title',
              `${events[i].children[0].textContent} ${events[i].children[1].textContent}`
            );
          }
        });
      },
      immediate: true,
    },
  },
  methods: {
    handleDateClick(e) {
      this.eventPopup(e);
    },
    eventPopup(rootElem) {
      if (document.getElementById('dummy')) {
        const elem = document.getElementById('dummy');
        elem.parentNode.removeChild(elem);
      }
      const rightEvent = this.allEvents.find(
        v =>
          v.user_id === rootElem.event._def.extendedProps.user_id &&
          v.updated_at === rootElem.event._def.extendedProps.updated_at &&
          v.name === rootElem.event._def.extendedProps.name &&
          v.location === rootElem.event._def.extendedProps.location &&
          v.datetime === rootElem.event._def.extendedProps.datetime
      );
      const eventId = rightEvent.id;
      const { status, eventStatus } = rightEvent;
      const avatar = rootElem.event._def.extendedProps.creator_avatar;
      const avatarSS = rootElem.event._def.extendedProps.user.avatar;
      const userID = rootElem.event._def.extendedProps.user_id;
      const { name } = rootElem.event._def.extendedProps;
      const eventDay = new Date(rootElem.event.startStr).getDate();
      const root = rootElem.el.parentNode.parentNode.parentNode.parentNode;
      const tooltip = `<div class="fc-tool" id="dummy" >
          <div class="fc-tool-wrap">
          <div class="fc-tool-wrap-header">
          ${eventDay}
          </div>
          <div class="fc-tool-wrap-body">
          ${
            (this.userID !== userID && avatar) || (avatarSS && status === 'secret-santa')
              ? `<div className="fc-tool-wrap-body--image">
            <img src="${avatar || avatarSS}" width="36px" height="36px">
          </div>`
              : ``
          }
          <div class="fc-tool-wrap-body--text">
          <p title="${name}" class="${
        (this.userID !== userID && avatar) || (avatarSS && status === 'secret-santa') ? 'has-image-text' : ''
      }">
          ${name}
          </p>
          </div>
          </div>
          <div class="fc-tool-wrap-footer">
          <button class="b-btn-primary goto-button">${this.$t('profile.calendar.goToEvent')}</button>
          </div>
          </div>
          </div>`;
      root.style.position = 'relative';
      root.insertAdjacentHTML('afterbegin', tooltip);
      if (document.body.clientWidth <= 1399) {
        const child = document.getElementsByClassName('fc-tool')[0];
        if (root.parentNode.children[0] === root) {
          child.style.left = 0;
        } else if (root.parentNode.children[6] === root) {
          child.style.right = 0;
        } else if (document.body.clientWidth > 600) {
          child.style.right = '-50%';
        } else {
          child.style.right = '-100%';
        }
      }

      this.appendClickEvent(rootElem, eventId, status, eventStatus);
    },
    appendClickEvent(rootElem, eventId, status, eventStatus) {
      window.addEventListener('mouseup', event => {
        const element = document.getElementsByClassName('fc-tool')[0];
        if (element && event.target !== element && event.target.parentNode !== element) {
          element.style.display = 'none';
        }
      });

      const button = document.getElementsByClassName('goto-button')[0];
      button.addEventListener('click', () => {
        this.eventBtn(eventId, status, eventStatus);
      });
    },
    eventBtn(eventId, status, eventStatus) {
      if (eventStatus && eventStatus === 'inProgress') {
        this.$router.push(`/create-event/${status}`);
      } else {
        this.$router.push(`/events/${status}/${eventId}`);
      }
    },
  },
};
</script>

<style lang="scss">
@import './../../assets/styles/atoms/AtomFullCalendar.scss';
</style>
