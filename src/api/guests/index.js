import axios from '@/api/axios';
import { ANNIVERSARY_EVENTS, GUESTS } from '@/links';

const inviteGuests = id => axios.get(`${ANNIVERSARY_EVENTS}/${id}/invite`);

const inviteGuest = id => axios.get(`${GUESTS}/${id}/invite`);

const getInvitations = () => axios.get(`${GUESTS}/get-invitations`);

const answerInvitations = (id, payload) => axios.post(`${GUESTS}/${id}/accept`, payload);

const updateGuestSight = (id, payload) => axios.put(`${GUESTS}/${id}`, payload);

const removeGuest = id => axios.delete(`${GUESTS}/${id}`);

export default {
  inviteGuests,
  inviteGuest,
  updateGuestSight,
  answerInvitations,
  getInvitations,
  removeGuest,
};
