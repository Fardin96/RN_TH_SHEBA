import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalCache = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (e) {
    console.error('error setting cache: ', e);
  }
};

export const getLocalCache = async key => {
  try {
    const cache = await AsyncStorage.getItem(key);
    return cache;
  } catch (e) {
    console.warn('error fetching cached data: ', e);
    return null;
  }
};

export const remLocalCache = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('error removing cached data: ', e);
  }
};
