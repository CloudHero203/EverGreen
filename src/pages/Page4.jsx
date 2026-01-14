import React, { useState, useEffect } from 'react';
import * as usageService from '../services/usageService';
import { handleApiError } from '../utils/errorHandler';

const imgIcon = "https://www.figma.com/api/mcp/asset/1effc2a4-128f-44dd-b3e2-c8679c1f53b3";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/312bf83b-e868-4c83-9209-e70a9b4e1a57";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/ff3f27a1-2264-4e47-bc57-6cb96a5bb350";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/93cdbe46-5c2d-4733-bf93-381c3186506a";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/483a50aa-ef93-48b7-a310-2596120a1b75";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/7e2ce8ec-c61b-4bdb-b112-a1ab58b9358c";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/430b9980-1f13-4c54-a82a-a4b4cf83157e";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/d7872d5f-f3c3-4af6-8fc8-f058a648014c";

export default function Page4() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('7days'); // 7days, 30days, custom
  const [filters, setFilters] = useState({
    status: 'all',
    model: 'all',
    search: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Load usage stats and history on mount and when filters change
  useEffect(() => {
    loadUsageData();
  }, [dateRange, filters.status, filters.model, pagination.page]);

  // Calculate date range
  const getDateRange = () => {
    const end = new Date();
    const start = new Date();
    
    switch (dateRange) {
      case '7days':
        start.setDate(start.getDate() - 7);
        break;
      case '30days':
        start.setDate(start.getDate() - 30);
        break;
      case '90days':
        start.setDate(start.getDate() - 90);
        break;
      default:
        start.setDate(start.getDate() - 7);
    }
    
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    };
  };

  // Load usage statistics and history
  const loadUsageData = async () => {
    try {
      setLoading(true);
      const dateRangeObj = getDateRange();
      
      // Load stats
      const statsData = await usageService.getUsageStats(dateRangeObj);
      setStats(statsData);
      
      // Load history
      const historyData = await usageService.getUsageHistory(
        {
          ...filters,
          start: dateRangeObj.start,
          end: dateRangeObj.end,
        },
        { page: pagination.page, limit: pagination.limit }
      );
      
      setHistory(historyData.data || historyData.history || []);
      if (historyData.total !== undefined) {
        setPagination(prev => ({ ...prev, total: historyData.total }));
      }
    } catch (error) {
      handleApiError(error, 'loadUsageData');
    } finally {
      setLoading(false);
    }
  };

  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, search: value }));
    // Debounce search - reload after user stops typing
    setTimeout(() => {
      if (filters.search !== value) {
        setPagination(prev => ({ ...prev, page: 1 }));
        loadUsageData();
      }
    }, 500);
  };

  // Handle export data
  const handleExportData = async () => {
    try {
      setLoading(true);
      const dateRangeObj = getDateRange();
      const blob = await usageService.exportUsageData(dateRangeObj, 'csv');
      const filename = `usage_${dateRangeObj.start}_${dateRangeObj.end}.csv`;
      usageService.downloadUsageData(blob, filename);
    } catch (error) {
      handleApiError(error, 'exportUsageData');
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="Create Chinese Layout Page" data-node-id="1:261">
      <div className="bg-[#f9fafb] flex flex-col items-start min-h-screen w-full" data-name="App" data-node-id="1:262">
        {/* Header */}
        <header className="bg-white border-b border-[#e5e7eb] flex flex-col py-4 px-6 w-full" data-name="Header" data-node-id="1:263">
          <div className="flex h-9 items-center justify-between w-full max-w-7xl mx-auto" data-name="Container" data-node-id="1:264">
            <div className="flex gap-8 items-center" data-name="Container" data-node-id="1:265">
              <h1 className="font-bold leading-7 text-[#101828] text-xl" data-name="Heading 1" data-node-id="1:266">
                MT KUAE 智算平台
              </h1>
              <nav className="flex gap-6 items-center" data-name="Navigation" data-node-id="1:268">
                <a href="#" className="font-normal leading-6 text-[#4a5565] text-base hover:text-[#101828] transition">概览</a>
                <a href="#" className="font-normal leading-6 text-[#f54900] text-base border-b-2 border-[#f54900] pb-1">用量</a>
                <a href="#" className="font-normal leading-6 text-[#4a5565] text-base hover:text-[#101828] transition">API 密钥</a>
                <a href="#" className="font-normal leading-6 text-[#4a5565] text-base hover:text-[#101828] transition">设置</a>
              </nav>
            </div>
            <div className="flex gap-4 items-center" data-name="Container" data-node-id="1:277">
              <button className="font-normal leading-5 text-[#364153] text-sm hover:text-[#101828] transition">文档</button>
              <div className="bg-[#f54900] relative rounded-full shrink-0 w-8 h-8 flex items-center justify-center" data-name="Container" data-node-id="1:280">
                <p className="font-normal leading-5 relative shrink-0 text-sm text-white" data-node-id="1:281">
                  U
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full p-8" data-name="Main Content" data-node-id="1:282">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex h-14 items-center justify-between mb-8" data-name="Container" data-node-id="1:283">
              <div className="h-14" data-name="Container" data-node-id="1:284">
                <h2 className="font-bold leading-8 text-[#101828] text-2xl mb-1" data-name="Heading 2" data-node-id="1:285">
                  用量统计
                </h2>
                <p className="font-normal leading-5 text-[#6a7282] text-sm" data-name="Paragraph" data-node-id="1:287">
                  查看您的 API 调用和令牌使用情况
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <select
                  value={dateRange}
                  onChange={(e) => handleDateRangeChange(e.target.value)}
                  className="bg-white border border-[#d1d5dc] h-[37px] relative rounded-[10px] px-4 flex items-center gap-2 hover:bg-gray-50 transition outline-none focus:ring-2 focus:ring-[#f54900]"
                >
                  <option value="7days">最近 7 天</option>
                  <option value="30days">最近 30 天</option>
                  <option value="90days">最近 90 天</option>
                </select>
                <button 
                  onClick={handleExportData}
                  disabled={loading}
                  className="bg-[#f54900] h-9 relative rounded-[10px] px-4 hover:opacity-90 transition disabled:opacity-50"
                >
                  <span className="font-normal leading-5 text-sm text-white">
                    {loading ? '导出中...' : '导出数据'}
                  </span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-name="StatsCards" data-node-id="1:302">
              {/* Total Requests */}
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-normal leading-5 text-[#4a5565] text-sm mb-1">总请求次数</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold leading-9 text-[#101828] text-3xl">
                        {loading ? '...' : stats?.total_requests?.toLocaleString() || '0'}
                      </h3>
                      <span className="font-normal leading-5 text-[#6a7282] text-sm">次</span>
                    </div>
                  </div>
                  {stats?.total_requests_change && (
                    <div className={`flex gap-1 h-7 items-center px-2 rounded ${
                      stats.total_requests_change >= 0 ? 'bg-[#f0fdf4]' : 'bg-[#fef2f2]'
                    }`}>
                      <img alt="" className="w-4 h-4" src={imgIcon2} />
                      <span className={`font-normal leading-5 text-sm ${
                        stats.total_requests_change >= 0 ? 'text-[#00a63e]' : 'text-[#e7000b]'
                      }`}>
                        {stats.total_requests_change >= 0 ? '+' : ''}{stats.total_requests_change}%
                      </span>
                    </div>
                  )}
                </div>
                {stats?.total_requests_change && (
                  <p className="font-normal leading-4 text-[#6a7282] text-xs">较上一周期</p>
                )}
              </div>

              {/* Input Tokens */}
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-normal leading-5 text-[#4a5565] text-sm mb-1">输入 tokens</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold leading-9 text-[#101828] text-3xl">
                        {loading ? '...' : stats?.input_tokens ? `${(stats.input_tokens / 1000000).toFixed(1)}M` : '0'}
                      </h3>
                      <span className="font-normal leading-5 text-[#6a7282] text-sm">tokens</span>
                    </div>
                  </div>
                  {stats?.input_tokens_change && (
                    <div className={`flex gap-1 h-7 items-center px-2 rounded ${
                      stats.input_tokens_change >= 0 ? 'bg-[#f0fdf4]' : 'bg-[#fef2f2]'
                    }`}>
                      <img alt="" className="w-4 h-4" src={imgIcon2} />
                      <span className={`font-normal leading-5 text-sm ${
                        stats.input_tokens_change >= 0 ? 'text-[#00a63e]' : 'text-[#e7000b]'
                      }`}>
                        {stats.input_tokens_change >= 0 ? '+' : ''}{stats.input_tokens_change}%
                      </span>
                    </div>
                  )}
                </div>
                {stats?.input_tokens_change && (
                  <p className="font-normal leading-4 text-[#6a7282] text-xs">较上一周期</p>
                )}
              </div>

              {/* Output Tokens */}
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-normal leading-5 text-[#4a5565] text-sm mb-1">输出 tokens</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold leading-9 text-[#101828] text-3xl">
                        {loading ? '...' : stats?.output_tokens ? `${(stats.output_tokens / 1000000).toFixed(1)}M` : '0'}
                      </h3>
                      <span className="font-normal leading-5 text-[#6a7282] text-sm">tokens</span>
                    </div>
                  </div>
                  {stats?.output_tokens_change && (
                    <div className={`flex gap-1 h-7 items-center px-2 rounded ${
                      stats.output_tokens_change >= 0 ? 'bg-[#f0fdf4]' : 'bg-[#fef2f2]'
                    }`}>
                      <img alt="" className="w-4 h-4" src={imgIcon3} />
                      <span className={`font-normal leading-5 text-sm ${
                        stats.output_tokens_change >= 0 ? 'text-[#00a63e]' : 'text-[#e7000b]'
                      }`}>
                        {stats.output_tokens_change >= 0 ? '+' : ''}{stats.output_tokens_change}%
                      </span>
                    </div>
                  )}
                </div>
                {stats?.output_tokens_change && (
                  <p className="font-normal leading-4 text-[#6a7282] text-xs">较上一周期</p>
                )}
              </div>

              {/* Total Cost */}
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-normal leading-5 text-[#4a5565] text-sm mb-1">总费用</p>
                    <h3 className="font-bold leading-9 text-[#101828] text-3xl">
                      {loading ? '...' : stats?.total_cost ? `¥${stats.total_cost.toFixed(2)}` : '¥0.00'}
                    </h3>
                  </div>
                  {stats?.total_cost_change && (
                    <div className={`flex gap-1 h-7 items-center px-2 rounded ${
                      stats.total_cost_change >= 0 ? 'bg-[#f0fdf4]' : 'bg-[#fef2f2]'
                    }`}>
                      <img alt="" className="w-4 h-4" src={imgIcon2} />
                      <span className={`font-normal leading-5 text-sm ${
                        stats.total_cost_change >= 0 ? 'text-[#00a63e]' : 'text-[#e7000b]'
                      }`}>
                        {stats.total_cost_change >= 0 ? '+' : ''}{stats.total_cost_change}%
                      </span>
                    </div>
                  )}
                </div>
                {stats?.total_cost_change && (
                  <p className="font-normal leading-4 text-[#6a7282] text-xs">较上一周期</p>
                )}
              </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-6 mb-8" data-name="UsageCharts" data-node-id="1:372">
              {/* API Request Trend Chart */}
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6" data-name="Container" data-node-id="1:373">
                <div className="mb-4" data-name="Container" data-node-id="1:374">
                  <h3 className="font-bold leading-7 text-[#101828] text-lg mb-1" data-name="Heading 3" data-node-id="1:375">
                    API 请求趋势
                  </h3>
                  <p className="font-normal leading-5 text-[#6a7282] text-sm" data-name="Paragraph" data-node-id="1:377">
                    每日请求次数统计
                  </p>
                </div>
                <div className="h-[300px] flex items-end justify-center bg-gray-50 rounded" data-name="LineChart" data-node-id="1:379">
                  <div className="text-center text-sm text-gray-400 py-20">
                    <p>图表区域</p>
                    <p className="text-xs mt-2">（实际实现需要使用图表库）</p>
                  </div>
                </div>
              </div>

              {/* Tokens Usage Chart */}
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6" data-name="Container" data-node-id="1:488">
                <div className="mb-4" data-name="Container" data-node-id="1:489">
                  <h3 className="font-bold leading-7 text-[#101828] text-lg mb-1" data-name="Heading 3" data-node-id="1:490">
                    Tokens 使用量
                  </h3>
                  <p className="font-normal leading-5 text-[#6a7282] text-sm" data-name="Paragraph" data-node-id="1:492">
                    输入和输出 tokens 统计
                  </p>
                </div>
                <div className="h-[300px] flex items-end justify-center bg-gray-50 rounded" data-name="BarChart" data-node-id="1:494">
                  <div className="text-center text-sm text-gray-400 py-20">
                    <p>图表区域</p>
                    <p className="text-xs mt-2">（实际实现需要使用图表库）</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Table */}
            <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden" data-name="UsageTable" data-node-id="1:604">
              {/* Table Header */}
              <div className="border-b border-[#e5e7eb] p-6" data-name="Container" data-node-id="1:605">
                <div className="mb-4" data-name="Container" data-node-id="1:606">
                  <h3 className="font-bold leading-7 text-[#101828] text-lg mb-1" data-name="Heading 3" data-node-id="1:607">
                    使用记录详情
                  </h3>
                  <p className="font-normal leading-5 text-[#6a7282] text-sm" data-name="Paragraph" data-node-id="1:609">
                    查看所有 API 调用的详细信息
                  </p>
                </div>
                  <div className="flex gap-3 items-center flex-wrap">
                  <div className="flex-1 min-w-[300px] border border-[#d1d5dc] rounded-[10px] px-3 py-2 flex items-center gap-2">
                    <img alt="" className="w-4 h-4" src={imgIcon5} />
                    <input
                      type="text"
                      value={filters.search}
                      onChange={handleSearchChange}
                      placeholder="搜索请求 ID 或模型..."
                      className="flex-1 outline-none text-sm"
                    />
                  </div>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="border border-[#d1d5dc] rounded-[10px] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f54900]"
                  >
                    <option value="all">所有状态</option>
                    <option value="success">成功</option>
                    <option value="failure">失败</option>
                  </select>
                  <select
                    value={filters.model}
                    onChange={(e) => handleFilterChange('model', e.target.value)}
                    className="border border-[#d1d5dc] rounded-[10px] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f54900]"
                  >
                    <option value="all">所有模型</option>
                    <option value="DeepSeek-V4">DeepSeek-V4</option>
                    <option value="DeepSeek-V3.2">DeepSeek-V3.2</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto" data-name="Table" data-node-id="1:635">
                <table className="w-full">
                  <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-normal text-[#6a7282] uppercase tracking-wide">时间戳</th>
                      <th className="px-6 py-4 text-left text-xs font-normal text-[#6a7282] uppercase tracking-wide">模型</th>
                      <th className="px-6 py-4 text-left text-xs font-normal text-[#6a7282] uppercase tracking-wide">状态</th>
                      <th className="px-6 py-4 text-right text-xs font-normal text-[#6a7282] uppercase tracking-wide">输入 tokens</th>
                      <th className="px-6 py-4 text-right text-xs font-normal text-[#6a7282] uppercase tracking-wide">输出 tokens</th>
                      <th className="px-6 py-4 text-right text-xs font-normal text-[#6a7282] uppercase tracking-wide">费用</th>
                      <th className="px-6 py-4 text-right text-xs font-normal text-[#6a7282] uppercase tracking-wide">耗时</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#e5e7eb]">
                    {loading && history.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">加载中...</td>
                      </tr>
                    ) : history.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">暂无使用记录</td>
                      </tr>
                    ) : (
                      history.map((row, index) => (
                        <tr key={row.id || index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#101828]">
                            {row.timestamp || row.created_at ? new Date(row.timestamp || row.created_at).toLocaleString('zh-CN') : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-[#ffedd4] text-[#9f2d00] text-xs px-2.5 py-0.5 rounded">
                              {row.model || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <img alt="" className="w-4 h-4" src={row.status === "成功" || row.status === "success" ? imgIcon6 : imgIcon7} />
                              <span className={`text-sm ${
                                row.status === "成功" || row.status === "success" ? "text-[#00a63e]" : "text-[#e7000b]"
                              }`}>
                                {row.status === "success" ? "成功" : row.status === "failure" ? "失败" : row.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#101828] text-right">
                            {row.input_tokens?.toLocaleString() || '0'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#101828] text-right">
                            {row.output_tokens?.toLocaleString() || '0'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#101828] text-right">
                            {row.cost ? `¥${row.cost.toFixed(2)}` : '¥0.00'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6a7282] text-right">
                            {row.duration ? `${row.duration}s` : '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="border-t border-[#e5e7eb] flex items-center justify-between px-6 py-4">
                <div className="text-sm text-[#6a7282]">
                  显示 <span className="font-semibold">{history.length}</span> 条记录
                  {pagination.total > 0 && `，共 ${pagination.total} 条`}
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="border border-[#d1d5dc] rounded px-3 py-1.5 text-sm hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    上一页
                  </button>
                  {Array.from({ length: Math.min(3, Math.ceil((pagination.total || 1) / pagination.limit)) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`rounded px-3 py-1.5 text-sm transition ${
                          pagination.page === page
                            ? 'bg-[#f54900] text-white'
                            : 'border border-[#d1d5dc] hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= Math.ceil((pagination.total || 1) / pagination.limit)}
                    className="border border-[#d1d5dc] rounded px-3 py-1.5 text-sm hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
