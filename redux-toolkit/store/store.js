import {configureStore} from '@reduxjs/toolkit';
// reducers
import authTokenReducer from '../features/authentication/authToken';
// rtk-slices
import {authSlice} from '../features/authentication/auth-slice';
import {dailyTodolistSlice} from '../features/daily-todolist/daily-todolist-slice';

export const store = configureStore({
  reducer: {
    // auth
    [authSlice.reducerPath]: authSlice.reducer,
    authToken: authTokenReducer,
  },
  middleware: getDefaultMiddhleware => [
    ...getDefaultMiddhleware(),
    authSlice.middleware,
  ],
});
