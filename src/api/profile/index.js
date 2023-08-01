import axios from '@/api/axios';
import { PROFILE } from '@/links';

const getProfileInfo = () => axios.get(PROFILE.GET_INFO);

const editProfileInfo = payload => axios.put(PROFILE.EDIT_INFO, payload);

const getImageUrl = (payload, category) => axios.post(`${PROFILE.UPLOAD_IMAGE}/${category}`, payload);

const deleteFbUser = () => axios.put(`${PROFILE.DELETE_FB_USER}`);

const changePwd = payload => axios.put(`${PROFILE.CHANGE_PWD}`, payload);

export default {
  getProfileInfo,
  editProfileInfo,
  getImageUrl,
  deleteFbUser,
  changePwd,
};
