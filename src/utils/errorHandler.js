// Centralized error handling utility

/**
 * Formats API error messages for display to users
 * @param {Error|Object} error - The error object from API or network
 * @returns {string} User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return '发生未知错误';

  // Network errors
  if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
    return '网络连接失败，请检查您的网络设置';
  }

  // API response errors
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data?.message || '请求参数错误';
      case 401:
        return '未授权，请重新登录';
      case 403:
        return '没有权限执行此操作';
      case 404:
        return '请求的资源不存在';
      case 422:
        return data?.message || '数据验证失败';
      case 429:
        return '请求过于频繁，请稍后再试';
      case 500:
        return '服务器错误，请稍后再试';
      case 503:
        return '服务暂时不可用，请稍后再试';
      default:
        return data?.message || `请求失败 (${status})`;
    }
  }

  // Generic error messages
  if (error.message) {
    return error.message;
  }

  return '发生未知错误，请稍后再试';
};

/**
 * Logs error for debugging
 * @param {Error|Object} error - The error object
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = '') => {
  if (import.meta.env.DEV) {
    console.error(`[Error${context ? ` in ${context}` : ''}]:`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
};

/**
 * Shows error notification (can be extended with toast library)
 * @param {string} message - Error message to display
 */
export const showError = (message) => {
  // For now, use alert. Can be replaced with react-toastify or similar
  if (import.meta.env.DEV) {
    console.error('Error:', message);
  }
  // In production, you might want to use a toast notification library
  alert(message);
};

/**
 * Handles API error with logging and user notification
 * @param {Error|Object} error - The error object
 * @param {string} context - Context where error occurred
 * @returns {string} Formatted error message
 */
export const handleApiError = (error, context = '') => {
  const message = formatErrorMessage(error);
  logError(error, context);
  showError(message);
  return message;
};
