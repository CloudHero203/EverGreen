import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const imgIcon = "https://www.figma.com/api/mcp/asset/8e2bf196-d2a5-41e4-9308-a43e1563df7e";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/00e00440-defe-4c77-9b7a-6b25addef25b";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/5daa4b64-3fc9-4627-8634-4701ab5e0087";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/f6048ea9-d600-42fd-89f6-f5972c0ae5b8";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/d6060074-8925-4fe4-a6e6-bbd3094c8c43";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/2bf3fddc-6a46-4930-ac60-0934213a8e8a";

export default function Page1() {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '', name: '' });

  const handleStartChat = () => {
    navigate('/chat');
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
      // Optionally navigate to dashboard or chat
    } catch (error) {
      // Error handled by useAuth hook
    }
  };

  const handleSignup = async (e) => {
    e?.preventDefault();
    try {
      await signup(signupForm);
      setShowSignupModal(false);
      setSignupForm({ email: '', password: '', name: '' });
      // Optionally navigate to dashboard
    } catch (error) {
      // Error handled by useAuth hook
    }
  };

  const handleOpenLogin = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const handleOpenSignup = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const handleApiPlatform = () => {
    if (isAuthenticated()) {
      navigate('/api-keys');
    } else {
      handleOpenSignup();
    }
  };

  const handleStartTrial = () => {
    if (isAuthenticated()) {
      navigate('/chat');
    } else {
      handleOpenSignup();
    }
  };

  const handleContact = () => {
    // Could open a contact form or navigate to contact page
    window.location.href = 'mailto:support@example.com';
  };

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="Editable Flow Design" data-node-id="1:2">
      <div className="relative flex flex-col min-h-screen w-full" style={{ backgroundImage: "linear-gradient(104.98395667295998deg, rgba(15, 23, 43, 1) 0%, rgba(70, 25, 1, 1) 50%, rgba(15, 23, 43, 1) 100%)" }}>
        {/* Header */}
        <header className="bg-[rgba(15,23,43,0.8)] border-b border-[rgba(254,154,0,0.2)] flex flex-col py-4 px-6 w-full">
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="rounded-lg w-8 h-8" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 185, 0, 1) 0%, rgba(245, 73, 0, 1) 100%)" }} />
              <p className="font-bold text-xl text-white">MThreads</p>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-[#d1d5dc] text-base hover:text-white transition">产品</a>
              <a href="#" className="text-[#d1d5dc] text-base hover:text-white transition">解决方案</a>
              <a href="#" className="text-[#d1d5dc] text-base hover:text-white transition">定价</a>
              <a href="#" className="text-[#d1d5dc] text-base hover:text-white transition">资源</a>
            </nav>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleOpenLogin}
                className="text-[#d1d5dc] text-base hover:text-white transition"
              >
                登录
              </button>
              <button 
                onClick={handleOpenSignup}
                className="bg-gradient-to-r from-[#fe9a00] to-[#f54900] text-white px-6 py-2 rounded-lg shadow-lg hover:opacity-90 transition"
              >
                开始使用
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section className="relative py-24 px-6 w-full overflow-hidden">
            {/* Floating Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute blur-sm opacity-30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${4 + Math.random() * 8}px`,
                    height: `${4 + Math.random() * 8}px`,
                    backgroundImage: "linear-gradient(135deg, rgba(255, 185, 0, 0.2) 0%, rgba(255, 137, 4, 0.2) 100%)"
                  }}
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 relative z-10">
              {/* Feature Tag */}
              <div className="bg-[rgba(29,41,61,0.8)] border border-[rgba(254,154,0,0.3)] rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                <div className="bg-[#ffb900] opacity-80 rounded-full w-2 h-2" />
                <p className="text-[#d1d5dc] text-sm">DeepSeek-V4 先进AI模型全国首发</p>
              </div>

              {/* Main Heading */}
              <div className="text-center">
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                  用{' '}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, rgba(255, 185, 0, 1) 0%, rgba(255, 105, 0, 1) 100%)" }}>
                    AI 创新
                  </span>
                  {' '}构建未来
                </h1>
              </div>

              {/* Description */}
              <p className="text-[#d1d5dc] text-xl md:text-2xl text-center max-w-4xl leading-relaxed">
                基于摩尔线程全功能GPU运行尖端的大语言模型，释放强大的 AI 能力。以无与伦比的性能将您的想法变为现实。
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button 
                  onClick={handleStartChat}
                  className="bg-gradient-to-r from-[#fe9a00] to-[#f54900] text-white px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition w-full sm:w-auto"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">开始免费对话</span>
                    <span className="text-sm">体验全新旗舰模型</span>
                  </div>
                </button>
                <button 
                  onClick={handleApiPlatform}
                  className="bg-[rgba(29,41,61,0.8)] border border-[rgba(254,154,0,0.3)] text-white px-8 py-4 rounded-xl shadow-lg hover:bg-[rgba(29,41,61,0.9)] transition w-full sm:w-auto"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">API 开放平台</span>
                    <span className="text-sm">调用DeepSeek 最新模型，快速集成，流畅体验</span>
                  </div>
                </button>
              </div>

              {/* Statistics */}
              <div className="flex flex-wrap justify-center gap-12 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">100万+</p>
                  <p className="text-[#99a1af] text-sm mt-1">活跃用户</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">99.9%</p>
                  <p className="text-[#99a1af] text-sm mt-1">正常运行时间</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">500亿+</p>
                  <p className="text-[#99a1af] text-sm mt-1">API 调用</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 px-6 w-full">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-4">强大功能</h2>
                <p className="text-[#d1d5dc] text-xl">构建出色 AI 应用所需的一切</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: imgIcon, title: "光速效率", desc: "借助我们优化的基础设施，在毫秒内获得响应。" },
                  { icon: imgIcon1, title: "企业级安全", desc: "企业级加密和安全可信。" },
                  { icon: imgIcon2, title: "先进模型", desc: "访问具有无与伦比能力的尖端语言模型。" },
                  { icon: imgIcon3, title: "轻松扩展", desc: "从原型到生产，无限扩展。" },
                  { icon: imgIcon4, title: "开发者友好", desc: "简单的 API 和全面的文档助您快速上手。" },
                  { icon: imgIcon5, title: "全球覆盖", desc: "从世界任何地方低延迟访问。" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[rgba(29,41,61,0.5)] border border-[rgba(254,154,0,0.2)] rounded-2xl p-8 shadow-lg hover:border-[rgba(254,154,0,0.4)] transition"
                  >
                    <div
                      className="flex items-center justify-center rounded-xl w-14 h-14 mb-6"
                      style={{ backgroundImage: `linear-gradient(135deg, rgba(240, 177, 0, 1) 0%, rgba(255, 105, 0, 1) 100%)` }}
                    >
                      <img alt="" className="w-7 h-7" src={feature.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-[#d1d5dc] text-base">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trusted by Developers Section */}
          <section className="py-24 px-6 w-full">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-4">深受开发者信赖</h2>
                <p className="text-[#d1d5dc] text-xl">看看如何利用DeepSeek-V4解决实际业务问题</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "Code", title: "全栈代码生成", desc: '"如何基于DeepSeek-V4生成基于MUSA应用"' },
                  { icon: "内容", title: "内容创作与会议纪要", desc: '"如何基于DeepSeek-V4结构化创作，文案生成，智能会议纪要"' },
                  { icon: "CBI", title: "数据分析与报告", desc: '"如何基于DeepSeek-V4读取商业数据，总结趋势、异常值并生成可视化趋势分析和商业建议报告"' },
                ].map((caseStudy, index) => (
                  <div
                    key={index}
                    className="bg-[rgba(29,41,61,0.5)] border border-[rgba(254,154,0,0.2)] rounded-2xl p-8 shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="rounded-full w-12 h-12 flex items-center justify-center"
                        style={{ backgroundImage: "linear-gradient(135deg, rgba(254, 154, 0, 1) 0%, rgba(245, 73, 0, 1) 100%)" }}
                      >
                        <p className="font-bold text-sm text-white">{caseStudy.icon}</p>
                      </div>
                      <h3 className="text-lg font-bold text-white">{caseStudy.title}</h3>
                    </div>
                    <p className="text-[#d1d5dc] text-base leading-relaxed">{caseStudy.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-6 w-full">
            <div className="max-w-7xl mx-auto">
              <div
                className="rounded-3xl p-20 text-center relative overflow-hidden"
                style={{ backgroundImage: "linear-gradient(157.3801344663187deg, rgba(225, 113, 0, 1) 0%, rgba(202, 53, 0, 1) 100%)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: "linear-gradient(157.3801344663187deg, rgba(255, 185, 0, 0.2) 0%, rgba(255, 137, 4, 0.2) 100%)" }}
                />
                <div className="relative z-10">
                  <h2 className="text-5xl font-bold text-white mb-4">准备开始了吗？</h2>
                  <p className="text-[#fef3c6] text-xl mb-8">加入百万开发者，共同构建下一代 AI 应用</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleStartTrial}
                      className="bg-white text-[#f54900] px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition font-bold"
                    >
                      开始免费试用
                    </button>
                    <button 
                      onClick={handleContact}
                      className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white px-8 py-4 rounded-xl hover:bg-[rgba(255,255,255,0.2)] transition font-bold"
                    >
                      联系我们
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#0f172b] border-t border-[rgba(254,154,0,0.2)] py-12 px-6 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">产品</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">功能</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">定价</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">API</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">公司</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">关于</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">博客</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">招聘</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">资源</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">文档</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">支持</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">社区</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">法律</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">隐私</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">条款</a></li>
                  <li><a href="#" className="text-[#99a1af] hover:text-white transition">安全</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-[rgba(254,154,0,0.2)] pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="rounded w-6 h-6" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 185, 0, 1) 0%, rgba(245, 73, 0, 1) 100%)" }} />
                <p className="font-bold text-white">MThreads</p>
              </div>
              <p className="text-[#99a1af] text-sm">© 2026 MThreads. 保留所有权利。</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">登录</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f54900] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f54900] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#fe9a00] to-[#f54900] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  登录
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    handleOpenSignup();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  注册
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">注册</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f54900] focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f54900] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f54900] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#fe9a00] to-[#f54900] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  注册
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSignupModal(false);
                    handleOpenLogin();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  登录
                </button>
                <button
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
