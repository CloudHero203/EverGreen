// API endpoints and constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    CURRENT_USER: '/auth/me',
  },
  // Chat
  CHAT: {
    LIST: '/chats',
    CREATE: '/chats',
    GET: '/chats/:id',
    SEND_MESSAGE: '/chats/:id/messages',
    DELETE: '/chats/:id',
  },
  // API Keys
  API_KEYS: {
    LIST: '/api-keys',
    CREATE: '/api-keys',
    UPDATE: '/api-keys/:id',
    DELETE: '/api-keys/:id',
  },
  // Usage Statistics
  USAGE: {
    STATS: '/usage/stats',
    HISTORY: '/usage/history',
    EXPORT: '/usage/export',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
};
