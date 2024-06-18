import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.value = action.payload;
    },
    resetToken: state => {
      state.value = '';
    },
  },
});

export const {setAuthToken, resetToken} = authTokenSlice.actions;

export const getAuthToken = state => {
  // console.log('auth-token-slice: getAuthToken: ', state.authToken.value);
  return state.authToken.value;
};

export default authTokenSlice.reducer;
