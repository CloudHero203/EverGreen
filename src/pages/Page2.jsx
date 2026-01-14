import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';

const imgIcon = "https://www.figma.com/api/mcp/asset/34429e74-b0ab-4656-8536-853c8bd6f586";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/f18a5d48-0b5b-4c6a-98e1-f35715cc4e9e";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/23f45678-70c4-419b-8b18-02eece492d5b";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/04874f18-4700-4e98-a6f3-ea9d16d822eb";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/c1f4baa3-f86c-4905-a269-9345d31ea220";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/f05e040f-ebf9-4f4f-80ee-9cb62f66fc9d";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/4ea45d41-d1ac-47c7-bc9c-e37d1e14469e";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/63812b50-0602-4a00-825c-086a2eabbe56";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/772ca100-7f42-4489-a298-f412084ad9b1";

export default function Page2() {
  const {
    chats,
    currentChat,
    messages,
    loading,
    searchQuery,
    createChat,
    selectChat,
    sendMessage,
    deleteChat,
    searchChats,
    newChat,
  } = useChat();
  
  const [inputMessage, setInputMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle new chat button
  const handleNewChat = () => {
    newChat();
    setInputMessage('');
    inputRef.current?.focus();
  };

  // Handle chat selection
  const handleSelectChat = async (chatId) => {
    await selectChat(chatId);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    searchChats(query);
  };

  // Handle send message
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const messageText = inputMessage.trim();
    setInputMessage('');

    try {
      await sendMessage(messageText);
    } catch (error) {
      // Error handled by hook
      setInputMessage(messageText); // Restore message on error
    }
  };

  // Handle key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle copy message
  const handleCopyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could show toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Handle like message (placeholder)
  const handleLikeMessage = (messageId) => {
    // Implement like functionality
    console.log('Like message:', messageId);
  };

  // Group chats by date (simplified)
  const groupChatsByDate = (chats) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayChats = [];
    const yesterdayChats = [];
    const olderChats = [];

    chats.forEach(chat => {
      const chatDate = new Date(chat.createdAt || chat.created_at);
      if (chatDate.toDateString() === today.toDateString()) {
        todayChats.push(chat);
      } else if (chatDate.toDateString() === yesterday.toDateString()) {
        yesterdayChats.push(chat);
      } else {
        olderChats.push(chat);
      }
    });

    return { todayChats, yesterdayChats, olderChats };
  };

  const { todayChats, yesterdayChats, olderChats } = groupChatsByDate(chats);

  return (
    <div className="bg-white flex items-start relative min-h-screen w-full" data-name="Create Chat Page Layout" data-node-id="1:114">
      {/* Chat Sidebar */}
      <div className="bg-[#fafafa] border-r border-[#e5e5e5] h-screen relative shrink-0 w-64" data-name="ChatSidebar" data-node-id="1:115">
        <div className="flex flex-col items-start h-full w-full">
          {/* New Chat Button */}
          <div className="border-b border-[#e5e5e5] h-[60px] relative shrink-0 w-full" data-name="Container" data-node-id="1:116">
            <div className="flex flex-col items-start py-3 px-3 h-full w-full">
              <button 
                onClick={handleNewChat}
                className="bg-[#ff6b35] h-9 relative rounded-lg shrink-0 w-full hover:opacity-90 transition"
              >
                <div className="absolute left-[82px] w-4 h-4 top-[10px]">
                  <img alt="" className="block max-w-none w-full h-full" src={imgIcon} />
                </div>
                <p className="absolute font-normal leading-5 left-[127px] text-[#fafafa] text-sm text-center top-[7px] translate-x-[-50%]">
                  新对话
                </p>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="border-b border-[#e5e5e5] h-[60px] relative shrink-0 w-full" data-name="Container" data-node-id="1:123">
            <div className="flex flex-col items-start py-3 px-3 h-full w-full">
              <div className="h-9 relative shrink-0 w-full">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="搜索对话..."
                  className="absolute bg-[#f5f5f5] flex h-9 items-center left-0 overflow-hidden pl-9 pr-3 py-1 rounded-lg top-0 w-full text-[#717182] text-sm outline-none focus:bg-white focus:border focus:border-[#ff6b35]"
                />
                <div className="absolute left-3 w-4 h-4 top-[10px] pointer-events-none">
                  <img alt="" className="block max-w-none w-full h-full" src={imgIcon1} />
                </div>
              </div>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto w-full" data-name="Primitive.div" data-node-id="1:130">
            <div className="flex flex-col items-start overflow-hidden rounded-[inherit] h-full w-full">
              <div className="flex flex-col gap-4 py-2 px-2 relative shrink-0 w-full">
                {loading && chats.length === 0 ? (
                  <div className="text-center text-[#717182] text-sm py-4">加载中...</div>
                ) : chats.length === 0 ? (
                  <div className="text-center text-[#717182] text-sm py-4">暂无对话</div>
                ) : (
                  <>
                    {todayChats.length > 0 && (
                      <div className="flex flex-col items-start relative shrink-0 w-full">
                        <div className="flex gap-1 h-7 items-center pl-3 pr-0 py-0 relative shrink-0 w-full">
                          <p className="font-normal leading-4 relative text-[#717182] text-xs">今天</p>
                          <img alt="" className="relative shrink-0 w-3 h-3" src={imgIcon2} />
                        </div>
                        <div className="flex flex-col gap-0.5 items-start relative shrink-0 w-full">
                          {todayChats.map((chat) => (
                            <button
                              key={chat.id}
                              onClick={() => handleSelectChat(chat.id)}
                              className={`flex flex-col h-9 items-start pb-0 pt-2 px-3 relative rounded-[10px] shrink-0 w-full hover:bg-[#f5f5f5] transition ${
                                currentChat?.id === chat.id ? 'bg-[#f5f5f5]' : ''
                              }`}
                            >
                              <p className="font-normal leading-5 text-sm text-left truncate w-full">
                                {chat.title || chat.firstMessage || '新对话'}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {yesterdayChats.length > 0 && (
                      <div className="flex flex-col items-start relative shrink-0 w-full">
                        <div className="flex gap-1 h-7 items-center pl-3 pr-0 py-0 relative shrink-0 w-full">
                          <p className="font-normal leading-4 relative text-[#717182] text-xs">昨天</p>
                          <img alt="" className="relative shrink-0 w-3 h-3" src={imgIcon2} />
                        </div>
                        <div className="flex flex-col gap-0.5 items-start relative shrink-0 w-full">
                          {yesterdayChats.map((chat) => (
                            <button
                              key={chat.id}
                              onClick={() => handleSelectChat(chat.id)}
                              className={`flex flex-col h-9 items-start pb-0 pt-2 px-3 relative rounded-[10px] shrink-0 w-full hover:bg-[#f5f5f5] transition ${
                                currentChat?.id === chat.id ? 'bg-[#f5f5f5]' : ''
                              }`}
                            >
                              <p className="font-normal leading-5 text-sm text-left truncate w-full">
                                {chat.title || chat.firstMessage || '新对话'}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {olderChats.length > 0 && (
                      <div className="flex flex-col items-start relative shrink-0 w-full">
                        <div className="flex gap-1 h-7 items-center pl-3 pr-0 py-0 relative shrink-0 w-full">
                          <p className="font-normal leading-4 relative text-[#717182] text-xs">更早</p>
                          <img alt="" className="relative shrink-0 w-3 h-3" src={imgIcon2} />
                        </div>
                        <div className="flex flex-col gap-0.5 items-start relative shrink-0 w-full">
                          {olderChats.map((chat) => (
                            <button
                              key={chat.id}
                              onClick={() => handleSelectChat(chat.id)}
                              className={`flex flex-col h-9 items-start pb-0 pt-2 px-3 relative rounded-[10px] shrink-0 w-full hover:bg-[#f5f5f5] transition ${
                                currentChat?.id === chat.id ? 'bg-[#f5f5f5]' : ''
                              }`}
                            >
                              <p className="font-normal leading-5 text-sm text-left truncate w-full">
                                {chat.title || chat.firstMessage || '新对话'}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="border-t border-[#e5e5e5] h-[73px] relative shrink-0 w-full" data-name="Container" data-node-id="1:171">
            <div className="flex flex-col items-start py-3 px-3 h-full w-full">
              <div className="flex gap-3 h-12 items-center px-2 py-0 relative shrink-0 w-full" data-name="Container" data-node-id="1:172">
                <div className="bg-[#ff6b35] relative rounded-full shrink-0 w-8 h-8" data-name="Container" data-node-id="1:173">
                  <div className="flex items-center justify-center relative w-full h-full">
                    <p className="font-normal leading-6 relative shrink-0 text-[#fafafa] text-base" data-node-id="1:174">
                      U
                    </p>
                  </div>
                </div>
                <div className="flex-1 h-9 min-h-px min-w-px relative" data-name="Container" data-node-id="1:175">
                  <div className="flex flex-col items-start relative w-full h-full">
                    <div className="h-5 overflow-hidden relative shrink-0 w-full" data-name="Container" data-node-id="1:176">
                      <p className="absolute font-normal leading-5 left-0 text-[#0a0a0a] text-sm top-[-1px]" data-node-id="1:177">
                        用户
                      </p>
                    </div>
                    <div className="flex h-4 items-start overflow-hidden relative shrink-0 w-full" data-name="Container" data-node-id="1:178">
                      <p className="flex-1 font-normal leading-4 relative text-[#717182] text-xs whitespace-pre-wrap" data-node-id="1:179">
                        user@example.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Main */}
      <div className="bg-white flex-1 h-screen min-h-px min-w-px relative" data-name="ChatMain" data-node-id="1:180">
        <div className="flex flex-col gap-0.5 items-start relative w-full h-full">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto w-full">
            <div className="flex flex-col items-start overflow-hidden pb-0 pt-6 px-4 relative w-full min-h-full">
              {!currentChat && messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="text-center text-gray-400">
                    <p className="text-lg mb-2">开始新对话</p>
                    <p className="text-sm">在下方输入消息开始与 AI 对话</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 w-full">
                  {messages.map((message, index) => (
                    <div
                      key={message.id || index}
                      className={`flex flex-col gap-2 w-full ${
                        message.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <div className="bg-[#ff6b35] flex flex-col items-start pb-0 pt-3 px-4 rounded-2xl max-w-[80%]">
                          <p className="font-normal leading-6 text-base text-white whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-2 w-full max-w-[85%]">
                          <div className="bg-[#e9ebef] flex items-center justify-center rounded-full w-8 h-8 shrink-0">
                            <p className="font-normal leading-5 text-[#0a0a0a] text-sm">AI</p>
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            <div className="font-normal leading-6 text-[#0a0a0a] text-base whitespace-pre-wrap">
                              {message.content}
                            </div>
                            <div className="flex gap-1 h-8 items-center">
                              <button
                                onClick={() => handleCopyMessage(message.content)}
                                className="h-8 relative rounded-lg shrink-0 w-9 hover:bg-gray-100 transition"
                                title="复制"
                              >
                                <img alt="" className="block max-w-none w-full h-full p-1.5" src={imgIcon3} />
                              </button>
                              <button
                                onClick={() => handleLikeMessage(message.id)}
                                className="h-8 relative rounded-lg shrink-0 w-9 hover:bg-gray-100 transition"
                                title="点赞"
                              >
                                <img alt="" className="block max-w-none w-full h-full p-1.5" src={imgIcon4} />
                              </button>
                              <button
                                className="h-8 relative rounded-lg shrink-0 w-9 hover:bg-gray-100 transition"
                                title="更多操作"
                              >
                                <img alt="" className="block max-w-none w-full h-full p-1.5" src={imgIcon5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-start gap-2">
                      <div className="bg-[#e9ebef] flex items-center justify-center rounded-full w-8 h-8">
                        <p className="text-sm">AI</p>
                      </div>
                      <div className="text-gray-500 text-sm">正在思考...</div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-black h-[116px] relative shrink-0 w-full">
            <form onSubmit={handleSendMessage} className="flex flex-col gap-2 items-start pb-0 pt-4 px-4 relative w-full h-full">
              <div className="h-[60px] relative shrink-0 w-full">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="在此输入您的消息..."
                  className="absolute bg-[#f3f3f5] flex h-[60px] items-start left-0 overflow-hidden pl-3 pr-12 py-2 rounded-lg top-0 w-full resize-none outline-none focus:bg-white focus:border focus:border-[#ff6b35] text-[#0a0a0a] text-sm"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || loading}
                  className={`absolute bg-[#ff6b35] rounded-lg w-8 h-8 top-4 right-4 transition ${
                    !inputMessage.trim() || loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:opacity-90'
                  }`}
                >
                  <div className="absolute left-2 w-4 h-4 top-2">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon8} />
                  </div>
                </button>
              </div>
              <div className="flex h-4 items-start relative shrink-0 w-full">
                <p className="flex-1 font-normal leading-4 relative text-[#717182] text-xs text-center whitespace-pre-wrap">
                  按 Enter 发送，Shift + Enter 换行
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
