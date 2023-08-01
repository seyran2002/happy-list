import axios from '../axios';

const getCounts = () => axios.get(`/counts`);

export default {
  getCounts,
};
