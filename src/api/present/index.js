import axios from '@/api/axios';
import { PRESENTS } from '@/links';

const updatePresentSight = (id, payload) => axios.put(`${PRESENTS}/${id}`, payload);

const choosePresent = id => axios.get(`${PRESENTS}/${id}/select`);

const acceptPresent = (id, accept) => axios.post(`${PRESENTS}/${id}/accept`, accept);

const sharePresent = (presentId, guests) => axios.post(`${PRESENTS}/${presentId}/invite`, guests);

export default {
  updatePresentSight,
  choosePresent,
  acceptPresent,
  sharePresent,
};
