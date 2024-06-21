import {createSlice} from '@reduxjs/toolkit';
import {
  getLocalCache,
  setLocalCache,
  remLocalCache,
} from '../../../functions/Cache/cache';

const initialState = {
  value: '',
};

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.value = action.payload;
      setLocalCache(state.value);
    },
    resetToken: state => {
      state.value = '';
      remLocalCache();
    },
  },
});

export const {setAuthToken, resetToken} = authTokenSlice.actions;

export const getAuthToken = state => {
  return new Promise(async (resolve, reject) => {
    const cachedToken = await getLocalCache();

    if (cachedToken) {
      resolve(cachedToken);
    } else if (state?.authToken.value) {
      resolve(state?.authToken.value);
    } else {
      reject(null);
    }
  });
};

export default authTokenSlice.reducer;
