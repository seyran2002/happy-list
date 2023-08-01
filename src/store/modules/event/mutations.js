import mutationTypes from '../../types/mutation-types';

const mutations = {
  [mutationTypes.SET_ANNIVERSARY_EVENTS](state, payload) {
    state.anniversaryEvents = payload;
  },
  [mutationTypes.SET_SS_EVENTS](state, payload) {
    state.ssEvents = payload;
  },
  [mutationTypes.SET_INVITED_EVENTS](state, payload) {
    state.invitedEvents = payload;
  },
  [mutationTypes.SET_CURRENT_EVENT](state, payload) {
    state.currentEvent = payload;
  },
  [mutationTypes.SET_CURRENT_SANTA_EVENTS](state, payload) {
    state.currentSantaEvents = payload;
  },
  [mutationTypes.SET_EVENT_GUESTS](state, payload) {
    state.currentEventGuests = payload;
  },
  [mutationTypes.SET_EVENT_GIFTEE](state, payload) {
    state.currentEventGiftee = payload;
  },
  [mutationTypes.ADD_EVENT_GUEST](state, payload) {
    state.currentEventGuests.unshift(payload);
  },
  [mutationTypes.UPDATE_EVENT_GUEST](state, payload) {
    state.currentEventGuests = [
      ...state.currentEventGuests.map(guest => (guest.id === payload.id ? { ...guest, ...payload } : guest)),
    ];
  },
  [mutationTypes.DELETE_EVENT_GUEST](state, payload) {
    state.currentEventGuests.splice(payload, 1);
  },
  [mutationTypes.DELETE_EVENT_GUEST_BY_ID](state, payload) {
    state.currentEventGuests = state.currentEventGuests.filter(guest => guest.id !== payload);
  },
  [mutationTypes.SET_PRESENT_IMG](state, payload) {
    state.currentEventPresentImage = payload;
  },
  [mutationTypes.SET_EVENT_PRESENTS](state, payload) {
    state.currentEventPresents = payload.data;

    const invitedPresents = payload.data.filter(
      present => present.guests.filter(guest => guest.user_id === payload.userID && guest.pivot.accepted === 0).length
    );
    state.myInvitedPresents = invitedPresents.map(present => present.id);
  },
  [mutationTypes.ADD_EVENT_PRESENT](state, payload) {
    state.currentEventPresents.unshift(payload);
  },
  [mutationTypes.UPDATE_EVENT_PRESENT](state, payload) {
    state.currentEventPresents = [
      ...state.currentEventPresents.map(present => (present.id === payload.id ? { ...present, ...payload } : present)),
    ];
  },
  [mutationTypes.DELETE_EVENT_PRESENT](state, payload) {
    state.currentEventPresents.splice(payload, 1);
  },
  [mutationTypes.DELETE_EVENT_PRESENT_BY_ID](state, payload) {
    state.currentEventPresents = state.currentEventPresents.filter(present => present.id !== payload);
  },
  [mutationTypes.SET_MY_EVENT](state, payload) {
    state.myEvents = payload || [];
  },
  [mutationTypes.SET_MY_CONFIRMED_EVENT](state, payload) {
    state.myConfirmedEvents = payload || [];
  },
  [mutationTypes.SET_MY_INVITED_EVENTS](state, payload) {
    state.myInvitedEvents = payload;
  },
  [mutationTypes.DELETE_CURRENT_EVENT](state) {
    state.currentEvent = {};
  },
  [mutationTypes.UPDATE_INVITATIONS_ACCEPTED](state, payload) {
    state.myInvitedEvents.find(v => Number(v.id) === Number(payload.guest_id)).accepted = payload.accepted;
  },
  [mutationTypes.CLEAR_CURRENT_EVENT_STATE](state) {
    state.currentEvent = {};
    state.currentEventGuests = [];
    state.currentEventPresentImage = '';
    state.currentEventPresents = [];
  },
};

export default {
  mutations,
};
