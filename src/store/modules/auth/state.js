import { getStorageItem } from '@/helpers/storage';

export default {
  userData: getStorageItem('userData') || null,
  token: getStorageItem('token') || null,
  passwordInstruction: false,
  authModalVisibility: false,
  redirectAfterAuth: false,
  siteUrl: window.location.host,
};
