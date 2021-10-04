import React from 'react';
import { Layout, Menu, Card } from 'antd';

export default function Index(props) {
  const { children } = props;
  return (
    <Layout>
      <Layout.Sider>

        <Menu theme="dark" mode="vertical" defaultSelectedKeys={['2']}>
          <Menu.Item key="logo"><img src="/assets/white-logo.png" className="dashboard-logo" alt="logo" /></Menu.Item>
          <Menu.Item key="home">ماڵەوە</Menu.Item>
          <Menu.Item key="home">ماڵەوە</Menu.Item>
          <Menu.Item key="home">ماڵەوە</Menu.Item>
          <Menu.Item key="home">ماڵەوە</Menu.Item>
          <Menu.Item key="home">ماڵەوە</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ padding: '0 50px' }}>
        <Card>
          {children}
        </Card>
      </Layout.Content>
      {/* <Layout.Footer style={{ textAlign: 'center' }}>گەشەپێدان و دروستکردن گەشەپێدەرانی کورد</Layout.Footer> */}
    </Layout>
  );
}
