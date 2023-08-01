import axios from '@/api/axios';
import { SANTA_EVENTS, SANTA } from '@/links';

const createSantaEvent = payload => axios.post(SANTA_EVENTS, payload);

const getCurrentSantaEvent = () => axios.get(SANTA.CURRENT_EVENTS);

const getCurrentSantaEventById = id => axios.get(`${SANTA_EVENTS}/${id}`);

const updateSantaEvent = (payload, id) => axios.put(`${SANTA_EVENTS}/${id}`, payload);

const getMySantaEvents = () => axios.get(SANTA.MY_EVENTS);

const removeSantaEvent = id => axios.delete(`${SANTA_EVENTS}/${id}`);

const addSantaGuest = payload => axios.post(SANTA.GUESTS, payload);

const getSantaGuests = id => axios.get(`${SANTA_EVENTS}/${id}/guests`);

const removeSantaGuest = id => axios.delete(`${SANTA.GUESTS}/${id}`);

const raffleEvent = id => axios.get(`${SANTA_EVENTS}/${id}/raffle`);

const getSantaGiftee = id => axios.get(`${SANTA_EVENTS}/${id}/giftee`);

export default {
  createSantaEvent,
  updateSantaEvent,
  getCurrentSantaEvent,
  getCurrentSantaEventById,
  getMySantaEvents,
  removeSantaEvent,
  addSantaGuest,
  getSantaGuests,
  removeSantaGuest,
  raffleEvent,
  getSantaGiftee,
};
