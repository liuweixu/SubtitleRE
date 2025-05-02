import './App.css'
import LayoutNav from './layouts/LayoutNav'
import { ConfigProvider } from 'antd';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 背景层 - 组件 */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0, 
      }}>
      </div>
      
      {/* 内容层 - 透明的UI元素 */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        height: '100%',
        backgroundColor: 'transparent'  // 确保内容层背景透明
      }}>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: 'rgba(2, 2, 2, 0.06)',
            },
            components: {
              Layout: {
                colorBgHeader: 'transparent',
                colorBgBody: 'transparent',
              },
            },
          }}
        >
          <LayoutNav />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default App
