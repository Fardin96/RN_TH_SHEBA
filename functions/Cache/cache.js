import AsyncStorage from '@react-native-async-storage/async-storage';

export const localCache = async item => {
  try {
    // todo: key to env
    await AsyncStorage.setItem('key', item);
  } catch (e) {
    console.log(e);
  }

  console.log('Done caching.');
};

export const getLocalCache = async () => {
  try {
    await AsyncStorage.getItem('key').then(res =>
      console.log('response from login getLocalCache: ', res),
    );
  } catch (e) {
    // read error
    console.error('error fetching data: ', e);
  }

  console.log('Done fetching cache.');
};
