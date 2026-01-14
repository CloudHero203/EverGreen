import apiClient, { apiRequest } from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get usage statistics
 * @param {Object} dateRange - Date range object
 * @param {string} dateRange.start - Start date (ISO string)
 * @param {string} dateRange.end - End date (ISO string)
 * @returns {Promise<Object>} Usage statistics
 */
export const getUsageStats = async (dateRange) => {
  return apiRequest(
    () => apiClient.get(API_ENDPOINTS.USAGE.STATS, { params: dateRange }),
    'getUsageStats'
  );
};

/**
 * Get detailed usage history
 * @param {Object} filters - Filter options
 * @param {string} filters.status - Filter by status (success/failure)
 * @param {string} filters.model - Filter by model name
 * @param {string} filters.search - Search query
 * @param {Object} pagination - Pagination options
 * @param {number} pagination.page - Page number (1-indexed)
 * @param {number} pagination.limit - Items per page
 * @returns {Promise<Object>} Usage history with pagination info
 */
export const getUsageHistory = async (filters = {}, pagination = {}) => {
  const params = {
    ...filters,
    page: pagination.page || 1,
    limit: pagination.limit || 10,
  };
  return apiRequest(
    () => apiClient.get(API_ENDPOINTS.USAGE.HISTORY, { params }),
    'getUsageHistory'
  );
};

/**
 * Export usage data
 * @param {Object} dateRange - Date range object
 * @param {string} dateRange.start - Start date (ISO string)
 * @param {string} dateRange.end - End date (ISO string)
 * @param {string} format - Export format (csv/json)
 * @returns {Promise<Blob>} File blob for download
 */
export const exportUsageData = async (dateRange, format = 'csv') => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USAGE.EXPORT, {
      params: { ...dateRange, format },
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    const { handleApiError } = await import('../utils/errorHandler');
    handleApiError(error, 'exportUsageData');
    throw error;
  }
};

/**
 * Download exported usage data
 * @param {Blob} blob - File blob
 * @param {string} filename - Download filename
 */
export const downloadUsageData = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
