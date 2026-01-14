import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import { handleApiError } from '../utils/errorHandler';

/**
 * Custom hook for authentication state management
 * @returns {Object} Auth state and functions
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = authService.getUser();
        if (savedUser && authService.isAuthenticated()) {
          // Optionally verify token is still valid
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            authService.saveUser(currentUser);
          } catch (err) {
            // Token invalid, clear storage
            authService.logout();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Login function
   */
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(email, password);
      
      if (response.token) {
        authService.saveAuthToken(response.token);
        authService.saveUser(response.user);
        setUser(response.user);
        return response;
      }
      
      throw new Error('Invalid response from server');
    } catch (err) {
      const errorMessage = handleApiError(err, 'login');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Signup function
   */
  const signup = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.signup(userData);
      
      if (response.token) {
        authService.saveAuthToken(response.token);
        authService.saveUser(response.user);
        setUser(response.user);
        return response;
      }
      
      throw new Error('Invalid response from server');
    } catch (err) {
      const errorMessage = handleApiError(err, 'signup');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout function
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      // Clear local state even if API call fails
      setUser(null);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated() && !!user;
  }, [user]);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated,
    setError,
  };
};
