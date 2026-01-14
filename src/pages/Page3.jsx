import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiKeys } from '../hooks/useApiKeys';

const imgIcon = "https://www.figma.com/api/mcp/asset/e82c1394-a989-41cd-99bc-cc8f6fce2267";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/d267f2ff-6e1d-4f38-88c6-55499fb9bd02";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/10a091d3-9626-4068-90ac-024e1cc5e0dd";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/ce00821c-252a-4bb0-8d25-75a2e5fdd2d1";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/ec828069-a4fe-477a-9124-6ad81358e84a";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/5ad154ed-0872-480c-bd27-a0f4d6ca3fd6";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/b34103ec-7c21-4289-9dc7-66996a106f1a";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/93d88e97-587a-4449-8dd1-47abf766bc1c";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/0bd6ce76-4779-4152-9197-f713389c0e33";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/4cd7f883-2f5a-4089-bc26-5d649f4a0773";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/4ef0f6eb-6722-4e9c-b48a-20509c499a42";

export default function Page3() {
  const navigate = useNavigate();
  const { apiKeys, loading, createApiKey, updateApiKey, deleteApiKey, copyApiKey } = useApiKeys();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  // Handle create API key
  const handleCreateApiKey = async (e) => {
    e?.preventDefault();
    try {
      const newKey = await createApiKey(formData.name);
      setShowCreateModal(false);
      setFormData({ name: '' });
      // Show the full key in a modal or alert (only shown once)
      if (newKey.key) {
        alert(`API 密钥已创建！\n\n请妥善保管，此密钥仅显示一次：\n${newKey.key}`);
      }
    } catch (error) {
      // Error handled by hook
    }
  };

  // Handle edit API key
  const handleEditApiKey = async (e) => {
    e?.preventDefault();
    try {
      await updateApiKey(selectedKey.id, formData);
      setShowEditModal(false);
      setSelectedKey(null);
      setFormData({ name: '' });
    } catch (error) {
      // Error handled by hook
    }
  };

  // Handle delete API key
  const handleDeleteApiKey = async () => {
    try {
      await deleteApiKey(selectedKey.id);
      setShowDeleteModal(false);
      setSelectedKey(null);
    } catch (error) {
      // Error handled by hook
    }
  };

  // Handle copy API key
  const handleCopyKey = async (key) => {
    const success = await copyApiKey(key);
    if (success) {
      setCopiedKeyId(key);
      setTimeout(() => setCopiedKeyId(null), 2000);
    }
  };

  // Open create modal
  const openCreateModal = () => {
    setFormData({ name: '' });
    setShowCreateModal(true);
  };

  // Open edit modal
  const openEditModal = (apiKey) => {
    setSelectedKey(apiKey);
    setFormData({ name: apiKey.name || '' });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (apiKey) => {
    setSelectedKey(apiKey);
    setShowDeleteModal(true);
  };

  // Handle sidebar navigation
  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[#f9fafb] flex flex-col items-start relative min-h-screen w-full" data-name="Create Chinese API Keys Page" data-node-id="1:2">
      <div className="bg-[#f9fafb] h-screen relative shrink-0 w-full flex" data-name="App" data-node-id="1:3">
        {/* Sidebar */}
        <div className="bg-white border-r border-[#e5e7eb] h-screen relative shrink-0 w-[231px]" data-name="Sidebar" data-node-id="1:4">
          <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="border-b border-[#e5e7eb] flex h-16 items-center pl-6 pr-0 py-0 w-full" data-name="Container" data-node-id="1:5">
              <div className="h-7 relative shrink-0 w-[180px]" data-name="Heading 2" data-node-id="1:6">
                <p className="font-bold leading-7 text-[#101828] text-xl" data-node-id="1:7">
                  MT KUAE 智算平台
                </p>
              </div>
            </div>

            {/* Navigation List */}
            <div className="flex flex-col gap-1 py-5 px-3 flex-1 overflow-y-auto" data-name="List" data-node-id="1:8">
              <div className="h-9 relative shrink-0 w-full">
                <button 
                  onClick={() => handleNavClick('/')}
                  className="flex gap-3 h-9 items-center pl-3 pr-0 py-0 rounded-[10px] w-full hover:bg-gray-100 transition"
                >
                  <div className="relative shrink-0 w-5 h-5">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon} />
                  </div>
                  <p className="font-normal leading-5 text-[#364153] text-sm">概览</p>
                </button>
              </div>
              <div className="h-9 relative shrink-0 w-full">
                <button className="bg-[#eff6ff] flex gap-3 h-9 items-center pl-3 pr-0 py-0 rounded-[10px] w-full">
                  <div className="relative shrink-0 w-5 h-5">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon1} />
                  </div>
                  <p className="font-normal leading-5 text-[#155dfc] text-sm">API 密钥</p>
                </button>
              </div>
              <div className="h-9 relative shrink-0 w-full">
                <button className="flex gap-3 h-9 items-center pl-3 pr-0 py-0 rounded-[10px] w-full hover:bg-gray-100 transition">
                  <div className="relative shrink-0 w-5 h-5">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon2} />
                  </div>
                  <p className="font-normal leading-5 text-[#364153] text-sm">API 文档和SDK</p>
                </button>
              </div>
              <div className="h-9 relative shrink-0 w-full">
                <button 
                  onClick={() => handleNavClick('/usage')}
                  className="flex gap-3 h-9 items-center pl-3 pr-0 py-0 rounded-[10px] w-full hover:bg-gray-100 transition"
                >
                  <div className="relative shrink-0 w-5 h-5">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon3} />
                  </div>
                  <p className="font-normal leading-5 text-[#364153] text-sm">用量统计</p>
                </button>
              </div>
              <div className="h-9 relative shrink-0 w-full" data-name="List Item" data-node-id="1:42">
                <button className="flex gap-3 h-9 items-center pl-3 pr-0 py-0 rounded-[10px] w-full hover:bg-gray-100 transition" data-name="Button" data-node-id="1:43">
                  <div className="relative shrink-0 w-5 h-5" data-name="Icon" data-node-id="1:44">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon4} />
                  </div>
                  <p className="font-normal leading-5 text-[#364153] text-sm" data-node-id="1:48">
                    账单
                  </p>
                </button>
              </div>
              <div className="h-9 relative shrink-0 w-full" data-name="List Item" data-node-id="1:49">
                <button className="flex gap-3 h-9 items-center pl-3 pr-0 py-0 rounded-[10px] w-full hover:bg-gray-100 transition" data-name="Button" data-node-id="1:50">
                  <div className="relative shrink-0 w-5 h-5" data-name="Icon" data-node-id="1:51">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon5} />
                  </div>
                  <p className="font-normal leading-5 text-[#364153] text-sm" data-node-id="1:58">
                    文档
                  </p>
                </button>
              </div>
              <div className="h-9 relative shrink-0 w-full" data-name="List Item" data-node-id="1:59">
                <button className="flex gap-3 h-9 items-center pl-3 pr-0 py-0 rounded-[10px] w-full hover:bg-gray-100 transition" data-name="Button" data-node-id="1:60">
                  <div className="relative shrink-0 w-5 h-5" data-name="Icon" data-node-id="1:61">
                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon6} />
                  </div>
                  <p className="font-normal leading-5 text-[#364153] text-sm" data-node-id="1:65">
                    设置
                  </p>
                </button>
              </div>
            </div>

            {/* User Profile */}
            <div className="border-t border-[#e5e7eb] flex flex-col h-[69px] items-start pt-4 px-4 w-full" data-name="Container" data-node-id="1:66">
              <div className="flex gap-3 h-9 items-center relative shrink-0 w-full" data-name="Container" data-node-id="1:67">
                <div className="relative rounded-full shrink-0 w-8 h-8" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 105, 0, 1) 0%, rgba(245, 73, 0, 1) 100%)" }} data-name="Container" data-node-id="1:68">
                  <div className="flex items-center justify-center relative w-full h-full">
                    <p className="font-normal leading-5 relative shrink-0 text-sm text-white" data-node-id="1:69">
                      U
                    </p>
                  </div>
                </div>
                <div className="flex-1 h-9 min-h-px min-w-px relative" data-name="Container" data-node-id="1:70">
                  <div className="flex flex-col items-start relative w-full h-full">
                    <p className="font-normal leading-5 text-[#101828] text-sm" data-node-id="1:72">
                      用户账号
                    </p>
                    <p className="flex-1 font-normal leading-4 relative text-[#6a7282] text-xs whitespace-pre-wrap" data-node-id="1:74">
                      user@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8" data-name="ApiKeyManager" data-node-id="1:75">
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] shadow-lg w-full max-w-4xl" data-name="ApiKeyManager" data-node-id="1:75">
            {/* Header Section */}
            <div className="border-b border-[#e5e7eb] flex flex-col items-start p-6 w-full" data-name="Container" data-node-id="1:76">
              <div className="flex h-14 items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="1:77">
                <div className="h-14 relative shrink-0 w-[381px]" data-name="Container" data-node-id="1:78">
                  <div className="flex flex-col gap-1 items-start relative w-full h-full">
                    <h1 className="font-bold leading-8 text-[#101828] text-2xl" data-node-id="1:80">
                      API 密钥
                    </h1>
                    <p className="font-normal leading-5 text-[#6a7282] text-sm" data-node-id="1:82">
                      管理您的 API 密钥。请妥善保管您的密钥，不要与他人分享。
                    </p>
                  </div>
                </div>
                <button 
                  onClick={openCreateModal}
                  className="bg-[#ff6900] h-9 relative rounded-lg shrink-0 w-[126px] hover:opacity-90 transition"
                >
                  <div className="relative w-full h-full flex items-center justify-center gap-2">
                    <div className="relative shrink-0 w-4 h-4">
                      <img alt="" className="block max-w-none w-full h-full" src={imgIcon7} />
                    </div>
                    <p className="font-normal leading-5 text-sm text-white">创建新密钥</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto" data-name="Table" data-node-id="1:88">
              {/* Table Header */}
              <div className="border-b border-[rgba(0,0,0,0.1)] h-10" data-name="TableHeader" data-node-id="1:89">
                <div className="flex h-10 w-full" data-name="TableRow" data-node-id="1:90">
                  <div className="h-10 w-[100px] flex items-center px-2" data-name="TableHead" data-node-id="1:91">
                    <p className="font-normal leading-5 text-[#0a0a0a] text-sm" data-node-id="1:92">
                      名称
                    </p>
                  </div>
                  <div className="h-10 w-[184px] flex items-center px-2" data-name="TableHead" data-node-id="1:93">
                    <p className="font-normal leading-5 text-[#0a0a0a] text-sm" data-node-id="1:94">
                      密钥
                    </p>
                  </div>
                  <div className="h-10 w-[94px] flex items-center px-2" data-name="TableHead" data-node-id="1:95">
                    <p className="font-normal leading-5 text-[#0a0a0a] text-sm" data-node-id="1:96">
                      创建日期
                    </p>
                  </div>
                  <div className="h-10 w-[94px] flex items-center px-2" data-name="TableHead" data-node-id="1:97">
                    <p className="font-normal leading-5 text-[#0a0a0a] text-sm" data-node-id="1:98">
                      最后使用
                    </p>
                  </div>
                  <div className="h-10 flex-1 flex items-center justify-end px-2" data-name="TableHead" data-node-id="1:99">
                    <p className="font-normal leading-5 text-[#0a0a0a] text-sm text-right" data-node-id="1:100">
                      操作
                    </p>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="w-full">
                {loading && apiKeys.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">加载中...</div>
                ) : apiKeys.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">暂无 API 密钥</div>
                ) : (
                  apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="border-b border-[rgba(0,0,0,0.1)]">
                      <div className="flex h-[49px] w-full">
                        <div className="h-[49px] w-[100px] flex items-center px-2">
                          <p className="font-normal leading-5 text-[#0a0a0a] text-sm">
                            {apiKey.name || '未命名密钥'}
                          </p>
                        </div>
                        <div className="h-[49px] w-[184px] flex items-center px-2">
                          <div className="flex gap-2 h-8 items-center">
                            <div className="bg-[#f3f4f6] h-7 relative rounded px-2 flex items-center w-[124px]">
                              <p className="font-mono leading-5 not-italic text-[#0a0a0a] text-sm truncate">
                                {apiKey.key ? `${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}` : apiKey.masked_key || 'sk-****'}
                              </p>
                            </div>
                            <button
                              onClick={() => handleCopyKey(apiKey.key || apiKey.full_key)}
                              className="h-8 relative rounded-lg shrink-0 w-9 hover:bg-gray-100 transition"
                              title={copiedKeyId === apiKey.key ? '已复制' : '复制'}
                            >
                              <div className="flex items-center justify-center relative w-full h-full">
                                <div className="relative shrink-0 w-4 h-4">
                                  <img alt="" className="block max-w-none w-full h-full" src={imgIcon8} />
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="h-[49px] w-[94px] flex items-center px-2">
                          <p className="font-normal leading-5 text-[#4a5565] text-sm">
                            {apiKey.created_at ? new Date(apiKey.created_at).toLocaleDateString('zh-CN') : '-'}
                          </p>
                        </div>
                        <div className="h-[49px] w-[94px] flex items-center px-2">
                          <p className="font-normal leading-5 text-[#4a5565] text-sm">
                            {apiKey.last_used_at ? new Date(apiKey.last_used_at).toLocaleDateString('zh-CN') : '从未使用'}
                          </p>
                        </div>
                        <div className="h-[49px] flex-1 flex items-center justify-end px-2">
                          <div className="flex gap-2 h-8 items-center justify-end">
                            <button
                              onClick={() => openEditModal(apiKey)}
                              className="h-8 relative rounded-lg shrink-0 w-9 hover:bg-gray-100 transition"
                              title="编辑"
                            >
                              <div className="flex items-center justify-center relative w-full h-full">
                                <div className="relative shrink-0 w-4 h-4">
                                  <img alt="" className="block max-w-none w-full h-full" src={imgIcon9} />
                                </div>
                              </div>
                            </button>
                            <button
                              onClick={() => openDeleteModal(apiKey)}
                              className="h-8 relative rounded-lg shrink-0 w-9 hover:bg-gray-100 transition"
                              title="删除"
                            >
                              <div className="flex items-center justify-center relative w-full h-full">
                                <div className="relative shrink-0 w-4 h-4">
                                  <img alt="" className="block max-w-none w-full h-full" src={imgIcon10} />
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">创建新 API 密钥</h2>
            <form onSubmit={handleCreateApiKey}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">密钥名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="例如：生产环境密钥"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#ff6900] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  创建
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit API Key Modal */}
      {showEditModal && selectedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">编辑 API 密钥</h2>
            <form onSubmit={handleEditApiKey}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">密钥名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#ff6900] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedKey(null);
                  }}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">删除 API 密钥</h2>
            <p className="text-gray-600 mb-6">
              确定要删除密钥 <strong>{selectedKey.name || '未命名密钥'}</strong> 吗？此操作无法撤销。
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteApiKey}
                className="flex-1 bg-red-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                删除
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedKey(null);
                }}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
