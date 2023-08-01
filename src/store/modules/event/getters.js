import getterTypes from '../../types/getter-types';

const getters = {
  [getterTypes.ANNIVERSARY_EVENTS]: state => state.anniversaryEvents,
  [getterTypes.SS_EVENTS]: state => state.ssEvents,
  [getterTypes.MY_EVENTS]: state => state.myEvents,
  [getterTypes.MY_CONFIRMED_EVENTS]: state => state.myConfirmedEvents,
  [getterTypes.MY_INVITED_EVENTS]: state => state.myInvitedEvents,
  [getterTypes.MY_INVITED_EVENTS_LIST]: state => state.myInvitedEvents,
  [getterTypes.MY_INVITED_PRESENTS_LIST]: state => state.myInvitedPresents,
  [getterTypes.CURRENT_SANTA_EVENTS]: state => state.currentSantaEvents,
  [getterTypes.CURRENT_EVENT]: state => state.currentEvent,
  [getterTypes.CURRENT_EVENT_GUESTS]: state => state.currentEventGuests,
  [getterTypes.CURRENT_EVENT_PRESENT_IMAGE]: state => state.currentEventPresentImage,
  [getterTypes.CURRENT_EVENT_PRESENTS]: state => state.currentEventPresents,
  [getterTypes.CURRENT_EVENT_GIFTEE]: state => state.currentEventGiftee,
};

export default {
  getters,
};
