import apiClient, { apiRequest } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

/**
 * User login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data and token
 */
export const login = async (email, password) => {
  return apiRequest(
    () => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password }),
    'login'
  );
};

/**
 * User registration/signup
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.name - User name (optional)
 * @returns {Promise<Object>} User data and token
 */
export const signup = async (userData) => {
  return apiRequest(
    () => apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData),
    'signup'
  );
};

/**
 * User logout
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    // Continue with local cleanup even if API call fails
    console.error('Logout API error:', error);
  } finally {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} Current user data
 */
export const getCurrentUser = async () => {
  return apiRequest(
    () => apiClient.get(API_ENDPOINTS.AUTH.CURRENT_USER),
    'getCurrentUser'
  );
};

/**
 * Save authentication token to localStorage
 * @param {string} token - Auth token
 */
export const saveAuthToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} Auth token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Save user data to localStorage
 * @param {Object} user - User data
 */
export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Get user data from localStorage
 * @returns {Object|null} User data or null
 */
export const getUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};
