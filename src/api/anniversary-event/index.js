import axios from '@/api/axios';
import { ANNIVERSARY_EVENTS, GUESTS, PRESENTS, ANNIVERSARY } from '@/links';

const createAnniversaryEvent = payload => axios.post(ANNIVERSARY_EVENTS, payload);

const updateAnniversaryEvent = (payload, id) => axios.put(`${ANNIVERSARY_EVENTS}/${id}`, payload);

const getCurrentAnniversaryEvent = () => axios.get(ANNIVERSARY.CURRENT_EVENTS);

const getMyAnniversaryEvents = () => axios.get(ANNIVERSARY.MY_EVENTS);

const getMyInvitedEvents = () => axios.get(ANNIVERSARY.INVITED_EVENTS);

const acceptEvent = (guestId, payload) => axios.post(`/${GUESTS}/${guestId}/accept`, payload);

const getAnniversaryEvent = id => axios.get(`${ANNIVERSARY_EVENTS}/${id}`);

const removeAnniversaryEvent = id => axios.delete(`${ANNIVERSARY_EVENTS}/${id}`);

const addAnniversaryGuest = payload => axios.post(GUESTS, payload);

const getAnniversaryEventGuests = id => axios.get(`${ANNIVERSARY_EVENTS}/${id}/guests`);

const getInvitationsEventsFromToken = token => axios.get(`${ANNIVERSARY_EVENTS}/by/${token}`);

const acceptInvitationsEventsFromToken = token => axios.get(`${ANNIVERSARY_EVENTS}/accept/${token}`);

const removeAnniversaryGuest = id => axios.delete(`${GUESTS}/${id}`);

const getAnniversaryEventPresents = id => axios.get(`${ANNIVERSARY_EVENTS}/${id}/presents`);

const addAnniversaryPresent = payload => axios.post(PRESENTS, payload);

const updateAnniversaryPresent = (payload, id) => axios.put(`${PRESENTS}/${id}`, payload);

const removeAnniversaryPresent = id => axios.delete(`${PRESENTS}/${id}`);

export default {
  createAnniversaryEvent,
  updateAnniversaryEvent,
  getCurrentAnniversaryEvent,
  getMyAnniversaryEvents,
  getMyInvitedEvents,
  acceptEvent,
  getAnniversaryEvent,
  removeAnniversaryEvent,
  addAnniversaryGuest,
  getAnniversaryEventGuests,
  removeAnniversaryGuest,
  getAnniversaryEventPresents,
  getInvitationsEventsFromToken,
  acceptInvitationsEventsFromToken,
  addAnniversaryPresent,
  updateAnniversaryPresent,
  removeAnniversaryPresent,
};
