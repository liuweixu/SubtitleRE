import React, { useMemo, useState } from 'react';
import { Layout, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconHistogram, IconLive, IconSetting, IconSemiLogo } from '@douyinfe/semi-icons';
import { IconForm, IconBadge, IconBanner, IconAvatar, IconTree, IconTabs } from '@douyinfe/semi-icons-lab';
import SRTandASSAlignUI from './components_semiui/SRTandASSAlignUI';

const mainUI = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const [openKeys, setOpenKeys] = useState(['align', 'convert']);
    const [selectedKeys, setSelectedKeys] = useState(['SRT与ASS对齐']);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const onSelect = data => {
        console.log('trigger onSelect: ', data);
        setSelectedKeys([...data.selectedKeys]);
    };
    const onOpenChange = data => {
        console.log('trigger onOpenChange: ', data);
        setOpenKeys([...data.openKeys]);
    };

    const onCollapseChange = isCollapsed => {
        setIsCollapsed(isCollapsed);
    };

    const items = useMemo(() => [
        { itemKey: 'align', text: 'SRT与ASS对齐', icon: <IconBadge />, content: <SRTandASSAlignUI /> },
        {
            itemKey: 'ass-process',
            text: 'ASS处理',
            icon: <IconForm />,
            items: [
                {itemKey: 'ass-process1', text: 'ScaledBorderAndShadow', content: <div>SRT与ASS对齐</div>},
                {itemKey: 'ass-process2', text: 'ASS字体名称', content: <div>SRT与ASS对齐</div>},
                {itemKey: 'ass-process3', text: 'ASS样式信息', content: <div>SRT与ASS对齐</div>},
            ]
        },
        { itemKey: 'convert', text: 'SRT转为ASS', icon: <IconBanner />, content: <div>SRT与ASS对齐</div> },
        {
            text: 'MKV/ASS提取',
            icon: <IconTree />,
            itemKey: 'extract',
            items: [
                {itemKey: 'extract1', text: 'MKV字幕提取', content: <div>SRT与ASS对齐</div>},
                {itemKey: 'extract2', text: 'ASS字幕提取', content: <div>SRT与ASS对齐</div>},
            ],
        },
    ], []);
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
            <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <Nav
                    isCollapsed={isCollapsed}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    bodyStyle={{ height: 'calc(90vh - 120px)' }}
                    items={items}
                    header={{
                        logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
                        text: 'SubtitleRE字幕处理'
                    }}
                    footer={{
                        collapseButton: true
                    }}
                    onCollapseChange={onCollapseChange}
                    onOpenChange={onOpenChange}
                    onSelect={onSelect}
                />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                </Header>
                <Content
                    style={{
                        padding: '24px',
                        backgroundColor: 'var(--semi-color-bg-0)',
                    }}
                >
                    <div
                        style={{
                            borderRadius: '10px',
                            border: '1px solid var(--semi-color-border)',
                            height: 'calc(100vh - 120px)',
                            padding: '32px',
                        }}
                    >
                        {(() => {
                            // 查找主菜单项
                            const mainItem = items.find(item => item.itemKey === selectedKeys[0]);
                            if (mainItem) return mainItem.content;

                            for(const item of items) {
                                if(item.items) {
                                    const subItem = item.items.find(item => item.itemKey === selectedKeys[0]);
                                    if(subItem) return subItem.content;
                                }
                            }
                            return null
                        })()}
                    </div>
                </Content>
                <Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px',
                        color: 'var(--semi-color-text-2)',
                        backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                    }}
                >
                </Footer>
            </Layout>
        </Layout>
    );
};

export default mainUI;