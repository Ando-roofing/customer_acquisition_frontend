import apiClient from '@core/http/apiClient';
import { API_ENDPOINTS } from '@core/config/endpoints';
import { LoginPayload, LoginResponse } from './auth.types';

export const authApi = {
  login(payload: LoginPayload) {
    return apiClient.post<LoginResponse>(
      API_ENDPOINTS.auth.login,
      payload
    );
  },

  refresh(refreshToken: string) {
    return apiClient.post(API_ENDPOINTS.auth.refresh, {
      refresh: refreshToken,
    });
  },

  getMe() {
    return apiClient.get(API_ENDPOINTS.users.me);
  },

  logout() {
    return apiClient.post('/api/auth/logout/');
  }

};
