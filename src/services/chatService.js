import apiClient, { apiRequest } from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get list of all user chats
 * @returns {Promise<Array>} List of chat objects
 */
export const listChats = async () => {
  return apiRequest(
    () => apiClient.get(API_ENDPOINTS.CHAT.LIST),
    'listChats'
  );
};

/**
 * Create a new chat/conversation
 * @param {string} message - Initial message
 * @returns {Promise<Object>} Created chat object
 */
export const createChat = async (message) => {
  return apiRequest(
    () => apiClient.post(API_ENDPOINTS.CHAT.CREATE, { message }),
    'createChat'
  );
};

/**
 * Get chat by ID with full history
 * @param {string} chatId - Chat ID
 * @returns {Promise<Object>} Chat object with messages
 */
export const getChat = async (chatId) => {
  const endpoint = API_ENDPOINTS.CHAT.GET.replace(':id', chatId);
  return apiRequest(
    () => apiClient.get(endpoint),
    'getChat'
  );
};

/**
 * Send a message in a chat
 * @param {string} chatId - Chat ID
 * @param {string} message - Message content
 * @returns {Promise<Object>} Response message object
 */
export const sendMessage = async (chatId, message) => {
  const endpoint = API_ENDPOINTS.CHAT.SEND_MESSAGE.replace(':id', chatId);
  return apiRequest(
    () => apiClient.post(endpoint, { message }),
    'sendMessage'
  );
};

/**
 * Delete a chat
 * @param {string} chatId - Chat ID
 * @returns {Promise<void>}
 */
export const deleteChat = async (chatId) => {
  const endpoint = API_ENDPOINTS.CHAT.DELETE.replace(':id', chatId);
  return apiRequest(
    () => apiClient.delete(endpoint),
    'deleteChat'
  );
};

/**
 * Search chats by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Filtered list of chats
 */
export const searchChats = async (query) => {
  return apiRequest(
    () => apiClient.get(API_ENDPOINTS.CHAT.LIST, { params: { search: query } }),
    'searchChats'
  );
};
