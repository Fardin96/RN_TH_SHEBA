import {configureStore} from '@reduxjs/toolkit';
// reducers
import authTokenReducer from '../features/authentication/authToken';
// import todolistInfo from '../features/daily-todolist/todolist-info';
// rtk-slices
import {authSlice} from '../features/authentication/auth-slice';
import {dailyTodolistSlice} from '../features/daily-todolist/daily-todolist-slice';

export const store = configureStore({
  reducer: {
    // auth
    [authSlice.reducerPath]: authSlice.reducer,
    authToken: authTokenReducer,
    // todolist-slice
    // [dailyTodolistSlice.reducerPath]: dailyTodolistSlice.reducer,
    // todo: check if this is correct
    // todolistInfo: todolistInfo,
  },
  middleware: getDefaultMiddhleware => [
    ...getDefaultMiddhleware(),
    authSlice.middleware,
    dailyTodolistSlice.middleware,
  ],
});
