import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/auth.api';
import { clearSession } from './auth.slice';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (
    payload: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await authApi.login(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || 'Login failed'
      );
    }
  }
);

export const loadUserThunk = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getMe();
      return res.data;
    } catch {
      return rejectWithValue('Failed to load user');
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authApi.logout(); // optional
    } catch {
      // ignore backend errors
    } finally {
      dispatch(clearSession());
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      return rejectWithValue('No refresh token');
    }

    try {
      const res = await authApi.refresh(refreshToken);
      return res.data.access;
    } catch {
      return rejectWithValue('Refresh failed');
    }
  }
);


