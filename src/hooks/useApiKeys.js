import { useState, useEffect, useCallback } from 'react';
import * as apiKeyService from '../services/apiKeyService';
import { handleApiError } from '../utils/errorHandler';

/**
 * Custom hook for API keys state management
 * @returns {Object} API keys state and functions
 */
export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load API keys on mount
  useEffect(() => {
    loadApiKeys();
  }, []);

  /**
   * Load all API keys
   */
  const loadApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const keys = await apiKeyService.listApiKeys();
      setApiKeys(keys);
    } catch (err) {
      const errorMessage = handleApiError(err, 'loadApiKeys');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new API key
   */
  const createApiKey = useCallback(async (name) => {
    try {
      setLoading(true);
      setError(null);
      const newKey = await apiKeyService.createApiKey(name);
      setApiKeys((prev) => [newKey, ...prev]);
      return newKey;
    } catch (err) {
      const errorMessage = handleApiError(err, 'createApiKey');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update an API key
   */
  const updateApiKey = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const updatedKey = await apiKeyService.updateApiKey(id, data);
      setApiKeys((prev) =>
        prev.map((key) => (key.id === id ? updatedKey : key))
      );
      return updatedKey;
    } catch (err) {
      const errorMessage = handleApiError(err, 'updateApiKey');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete an API key
   */
  const deleteApiKey = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await apiKeyService.deleteApiKey(id);
      setApiKeys((prev) => prev.filter((key) => key.id !== id));
    } catch (err) {
      const errorMessage = handleApiError(err, 'deleteApiKey');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Copy API key to clipboard
   */
  const copyApiKey = useCallback(async (key) => {
    try {
      const success = await apiKeyService.copyApiKey(key);
      if (success) {
        // Could show a success toast here
        return true;
      }
      throw new Error('Failed to copy to clipboard');
    } catch (err) {
      const errorMessage = handleApiError(err, 'copyApiKey');
      setError(errorMessage);
      return false;
    }
  }, []);

  return {
    apiKeys,
    loading,
    error,
    loadApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    copyApiKey,
    setError,
  };
};
