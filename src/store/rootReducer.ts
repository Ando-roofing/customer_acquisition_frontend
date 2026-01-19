import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/auth/store/auth.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
});
