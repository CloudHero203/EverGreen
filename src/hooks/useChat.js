import { useState, useEffect, useCallback } from 'react';
import * as chatService from '../services/chatService';
import { handleApiError } from '../utils/errorHandler';

/**
 * Custom hook for chat state management
 * @returns {Object} Chat state and functions
 */
export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load chats on mount
  useEffect(() => {
    loadChats();
  }, []);

  /**
   * Load all chats
   */
  const loadChats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const chatList = await chatService.listChats();
      setChats(chatList);
    } catch (err) {
      const errorMessage = handleApiError(err, 'loadChats');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new chat
   */
  const createChat = useCallback(async (message) => {
    try {
      setLoading(true);
      setError(null);
      const newChat = await chatService.createChat(message);
      setChats((prev) => [newChat, ...prev]);
      setCurrentChat(newChat);
      // Load messages for the new chat
      if (newChat.id) {
        await loadChatMessages(newChat.id);
      }
      return newChat;
    } catch (err) {
      const errorMessage = handleApiError(err, 'createChat');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load messages for a specific chat
   */
  const loadChatMessages = useCallback(async (chatId) => {
    try {
      setLoading(true);
      setError(null);
      const chat = await chatService.getChat(chatId);
      setCurrentChat(chat);
      setMessages(chat.messages || []);
      return chat;
    } catch (err) {
      const errorMessage = handleApiError(err, 'loadChatMessages');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Select a chat and load its messages
   */
  const selectChat = useCallback(async (chatId) => {
    await loadChatMessages(chatId);
  }, [loadChatMessages]);

  /**
   * Send a message in the current chat
   */
  const sendMessage = useCallback(async (message) => {
    if (!currentChat?.id) {
      // Create new chat if none exists
      const newChat = await createChat(message);
      return newChat;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await chatService.sendMessage(currentChat.id, message);
      
      // Add user message and AI response to messages
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: message },
        response,
      ]);
      
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err, 'sendMessage');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentChat, createChat]);

  /**
   * Delete a chat
   */
  const deleteChat = useCallback(async (chatId) => {
    try {
      setLoading(true);
      setError(null);
      await chatService.deleteChat(chatId);
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
      
      // Clear current chat if it was deleted
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (err) {
      const errorMessage = handleApiError(err, 'deleteChat');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentChat]);

  /**
   * Search chats
   */
  const searchChats = useCallback(async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      loadChats();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await chatService.searchChats(query);
      setChats(results);
    } catch (err) {
      const errorMessage = handleApiError(err, 'searchChats');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadChats]);

  /**
   * Start a new chat (clear current)
   */
  const newChat = useCallback(() => {
    setCurrentChat(null);
    setMessages([]);
  }, []);

  return {
    chats,
    currentChat,
    messages,
    loading,
    error,
    searchQuery,
    createChat,
    selectChat,
    sendMessage,
    deleteChat,
    searchChats,
    newChat,
    loadChats,
    setError,
  };
};
