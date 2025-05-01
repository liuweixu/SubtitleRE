import React, { Children, useState } from 'react';
import { Layout, ConfigProvider, Menu, Switch } from 'antd';
import { 
  CodepenOutlined,
  CodeSandboxOutlined,
  CodepenCircleOutlined,
  CodeOutlined
} from '@ant-design/icons';
import SRTAndASSAlign from '../components/SRTAndASSAlign'
import ScaleEdit from '../components/ASSProcess/ScaledEdit'
import ASSFontNameEdit from '../components/ASSProcess/ASSFontNameEdit';
import ASS_StyleEdit from '../components/ASSProcess/ASS_StyleEdit';
// 定义各个内容组件
// 这些内容涉及到需要操作的部分
const MKVASSExrtactorLayout = () => <div>正在处理中....</div>;
const SRTASSConventorLayout = () => <div>正在处理中....</div>;
const AlignProcessLayout = () => (
  <SRTAndASSAlign />
);
const ASSProcessScaledEditLayout = () => (
  <ScaleEdit />
);
const ASSProcessASSFontNameEditLayout = () => (
  <ASSFontNameEdit />
);
const ASSProcessASS_StyleEditLayout = () => (
  <ASS_StyleEdit />
);

const { Content, Footer, Sider } = Layout;

const App = () => {
  const [theme, setTheme] = useState('dark');
  const changeTheme = value => {
    setTheme(value ? 'dark' : 'light');
  };
  const [selectedKey, setSelectedKey] = useState('1');

  const items = [
    {
      key: '1',
      icon: <CodeOutlined />,
      label: 'SRT和ASS对齐',
      content: <AlignProcessLayout />
    },    {
      key: '2',
      icon: <CodeSandboxOutlined />,
      label: 'ASS处理',
      children: [
        {key: '21', label: 'ScaledBorderAndShadow处理', content: <ASSProcessScaledEditLayout />},
        {key: '22', label: 'ASS样式字体名称修改', content: <ASSProcessASSFontNameEditLayout />},
        {key: '23', label: 'ASS样式修改_基于输入样式', content: <ASSProcessASS_StyleEditLayout />},
      ]
    },
    {
      key: '3',
      icon: <CodepenCircleOutlined />,
      label: 'SRT转为ASS',
      content: <SRTASSConventorLayout />
    },
    {
      key: '4',
      icon: <CodepenOutlined />,
      label: 'MKV/ASS提取',
      content: <MKVASSExrtactorLayout />
    }
  ];
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" theme={theme}>
        <div style={{ height: 32, margin: 16,
          background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
        }} />
        <Switch
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Menu
          // theme="dark"
          theme={theme}
          mode="inline"
          defaultSelectedKeys={['3']}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={items}
        />
      </Sider>
      
      <Layout>
        <Content style={{ margin: '24px 16px 0'}}>
          <div style={{ 
            padding: 24, 
            minHeight: 'calc(100vh - 112px)'
          }}>
            {(() => {
              // 查找主菜单项
              const mainItem = items.find(item => item.key === selectedKey);
              if (mainItem) return mainItem.content;
              
              // 查找子菜单项
              for (const item of items) {
                if (item.children) {
                  const childItem = item.children.find(child => child.key === selectedKey);
                  if (childItem) return childItem.content;
                }
              }
              return null;
            })()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          A tool about subtitle processing / 一个用于字幕处理的小工具 ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;