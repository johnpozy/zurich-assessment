import { combineReducers } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSlice } from './auths/slice';
import { authApi } from './auths/api';

import { usersApi } from './users/api';
import { usersSlice } from './users/slice';
export const persistReducerConfig = {
  key: 'web',
  version: 1,
  storage,
  whitelist: ['auth']
};

export const rootReducers = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});
export const defaultMiddleware = (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}).concat(
  authApi.middleware,
  usersApi.middleware
);
