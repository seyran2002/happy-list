import axios from '@/api/axios';

const get = uri => axios.get(uri);

export default {
  get,
};
