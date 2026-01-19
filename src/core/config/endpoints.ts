export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login/',
    refresh: '/api/auth/refresh/',
    logout: '/api/auth/logout/',
  },

  users: {
    me: '/api/users/me/',
    list: '/api/users/',
    detail: (id: number | string) => `/api/users/${id}/`,
    create: '/api/users/',
    update: (id: number | string) => `/api/users/${id}/update/`,
  },

  visits: {
    list: '/api/visits/',
    detail: (id: number | string) => `/api/visits/${id}/`,
  },

  sales: {
    list: '/api/sales/',
    detail: (id: number | string) => `/api/sales/${id}/`,
  },
};
