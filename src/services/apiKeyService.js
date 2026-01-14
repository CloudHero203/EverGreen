import apiClient, { apiRequest } from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get list of all API keys
 * @returns {Promise<Array>} List of API key objects
 */
export const listApiKeys = async () => {
  return apiRequest(
    () => apiClient.get(API_ENDPOINTS.API_KEYS.LIST),
    'listApiKeys'
  );
};

/**
 * Create a new API key
 * @param {string} name - API key name/description
 * @returns {Promise<Object>} Created API key object (includes full key)
 */
export const createApiKey = async (name) => {
  return apiRequest(
    () => apiClient.post(API_ENDPOINTS.API_KEYS.CREATE, { name }),
    'createApiKey'
  );
};

/**
 * Update an API key
 * @param {string} id - API key ID
 * @param {Object} data - Update data (e.g., { name: 'New Name' })
 * @returns {Promise<Object>} Updated API key object
 */
export const updateApiKey = async (id, data) => {
  const endpoint = API_ENDPOINTS.API_KEYS.UPDATE.replace(':id', id);
  return apiRequest(
    () => apiClient.patch(endpoint, data),
    'updateApiKey'
  );
};

/**
 * Delete an API key
 * @param {string} id - API key ID
 * @returns {Promise<void>}
 */
export const deleteApiKey = async (id) => {
  const endpoint = API_ENDPOINTS.API_KEYS.DELETE.replace(':id', id);
  return apiRequest(
    () => apiClient.delete(endpoint),
    'deleteApiKey'
  );
};

/**
 * Copy API key to clipboard
 * @param {string} key - API key value
 * @returns {Promise<boolean>} True if successful
 */
export const copyApiKey = async (key) => {
  try {
    await navigator.clipboard.writeText(key);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = key;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};
