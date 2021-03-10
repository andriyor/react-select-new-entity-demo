import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import formReducer from './formSlice';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const rootReducer = combineReducers({
  form: formReducer,
  // persistedReducer: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
