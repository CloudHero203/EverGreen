import React from 'react'
import ReactDOM from 'react-dom/client'
// 导入路由核心组件BrowserRouter
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 用BrowserRouter包裹整个App，提供路由能力 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
