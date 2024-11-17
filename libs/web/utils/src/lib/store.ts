import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { defaultMiddleware, persistReducerConfig, rootReducers } from './reducers';

const persistedReducer = persistReducer(persistReducerConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleware,
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
