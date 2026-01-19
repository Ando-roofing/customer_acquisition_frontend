let accessToken: string | null = localStorage.getItem('access_token');

export const tokenService = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token: string) {
    accessToken = token;
    localStorage.setItem('access_token', token);
  },

  clear() {
    accessToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
