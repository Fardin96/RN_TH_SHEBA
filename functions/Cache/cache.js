import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalCache = async item => {
  try {
    console.log('item @cache.js: ', item);
    await AsyncStorage.setItem('key', item);
  } catch (e) {
    console.log('error setting cache: ', e);
  }

  // console.log('Done caching.');
};

export const getLocalCache = async () => {
  try {
    const cache = await AsyncStorage.getItem('key');
    return cache;
  } catch (e) {
    console.error('error fetching cached data: ', e);
    return null;
  }
};

export const remLocalCache = async () => {
  try {
    await AsyncStorage.removeItem('key', () => {
      console.log('successfully removed cached data');
    });
  } catch (e) {
    console.error('error removing cached data: ', e);
    return null;
  }
};
