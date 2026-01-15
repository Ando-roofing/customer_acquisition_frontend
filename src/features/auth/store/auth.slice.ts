import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, loadUserThunk, logoutThunk, refreshTokenThunk } from './auth.thunks';
import { tokenService } from '@core/auth/token.service';

export interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSession(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.status = 'authenticated';

        tokenService.setAccessToken(action.payload.access);
        localStorage.setItem('refresh_token', action.payload.refresh);
        })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      })

      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        localStorage.setItem('access_token', action.payload);
      })
        .addCase(refreshTokenThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = 'idle';

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      })

      // LOAD USER
      .addCase(loadUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'authenticated';
      })

      // LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = 'idle';
      });
  },
});

export const { clearSession } = authSlice.actions;
export default authSlice.reducer;
