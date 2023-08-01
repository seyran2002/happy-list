export const getStorageItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.error('Error getting data from localStorage', e);
    return null;
  }
};

export const setStorageItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error setting data to localStorage', e);
  }
};

export const removeStorageItem = key => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data from localStorage', e);
  }
};
