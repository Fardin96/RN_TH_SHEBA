import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {
    // placeholders
  },
};

export const todoListSlice = createSlice({
  name: 'todolistInfo',
  initialState: initialState,
  reducers: {
    setTodoListInfo: (state, action) => {
      // change this
      state.value = action.payload;
    },
    resetTodoListInfo: state => {
      // change this
      state.value = '';
    },
  },
});

export const {setTodoListInfo, resetTodoListInfo} = todoListSlice.actions;

export const getAuthToken = state => {
  // console.log('auth-token-slice: getAuthToken: ', state.authToken.value);
  //   change this
  return state.authToken.value;
};

export default todoListSlice.reducer;
