import React from 'react';
import {
  Layout, Menu, Card, Row, Col, Button,
} from 'antd';

class Index extends React.Component {
  constructor() {
    super();
    this.initialState = () => ({
      windowHeight: 0,

    });
    this.state = this.initialState();
  }

  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    const { children } = this.props;
    const { windowHeight } = this.state;
    return (
      <Layout style={{ height: windowHeight }}>
        <Layout.Sider>
          <div className="sidebar-logo-container">
            <Row justify="center" align="middle">
              <Col span={24} style={{ padding: 50 }}>
                <img src="/assets/white-logo.png" className="logo" alt="logo" />
              </Col>
              <Col span={24}>
                <p style={{ color: 'white', width: '100%', textAlign: 'center' }}>هەموو شتەکی فشە لێرە ببینە</p>
              </Col>
            </Row>
          </div>
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">ماڵەوە</Menu.Item>
            <Menu.Item key="2">سەرتاشخانە</Menu.Item>
            <Menu.Item key="my">میوەجات</Menu.Item>
            <Menu.Item key="4">شێتخانە</Menu.Item>
            <Menu.Item key="5">شەماعیە</Menu.Item>
          </Menu>
          {/* <Row>
            <Col span={24}>
              <Button size="large" block>سڵاوی جیهان</Button>
            </Col>
          </Row> */}
        </Layout.Sider>
        <Layout.Content style={{ padding: '0 50px' }}>
          <Card style={{ height: '100%' }}>
            {children}
          </Card>
        </Layout.Content>
        {/* <Layout.Footer style={{ textAlign: 'center' }}>گەشەپێدان و دروستکردن گەشەپێدەرانی کورد</Layout.Footer> */}
      </Layout>
    );
  }
}
export default Index;
