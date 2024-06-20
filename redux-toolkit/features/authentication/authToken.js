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
      // console.log('token in state: ', state.value);
      state.value = '';
      remLocalCache();
      // console.log('reset was token');
      // console.log('token in state: ', state.value);
    },
  },
});

export const {setAuthToken, resetToken} = authTokenSlice.actions;

// export const getAuthToken = async state => {
//   // console.log('auth-token-slice: getAuthToken: ', state.authToken.value);

//   const cachedToken = await getLocalCache();
//   console.log('cached token @authtoken-slice: ', cachedToken);

//   // return state?.authToken.value || cachedToken;
//   return cachedToken;
// };

export const getAuthToken = state => {
  return new Promise(async (resolve, reject) => {
    const cachedToken = await getLocalCache();
    // console.log('cached token @authtoken-slice: ', cachedToken);

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
