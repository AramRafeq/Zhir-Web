import React from 'react';
import {
  Layout, Menu, Card, Row, Col,
} from 'antd';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import {
  AudioOutlined,
} from '@ant-design/icons';
import { RiUserSettingsLine } from 'react-icons/ri';
import { MdDocumentScanner, MdOutlineLogout } from 'react-icons/md';
import { GiSoundWaves } from 'react-icons/gi';

class Index extends React.Component {
  constructor() {
    super();
    this.initialState = () => ({
      windowHeight: 0,
      windowWidth: 0,
      sideBarCollapsed: false,
    });
    this.state = this.initialState();

    this.updateDimensions = debounce(() => {
      this.setState({ windowHeight: window.innerHeight, windowWidth: window.innerWidth });
      const { windowWidth } = this.state;
      if (windowWidth < 992) {
        localStorage.setItem('sidebar-collapsed', true);
        this.setState({ sideBarCollapsed: true });
      } else {
        localStorage.setItem('sidebar-collapsed', false);
        this.setState({ sideBarCollapsed: false });
      }
    }, 300);
    this.onCollapse = (collapsed) => {
      localStorage.setItem('sidebar-collapsed', collapsed);
      this.setState({ sideBarCollapsed: collapsed });
    };
  }

  componentDidMount() {
    const sideBarCollapsed = localStorage.getItem('sidebar-collapsed');
    this.setState({
      windowHeight: window.innerHeight,
      sideBarCollapsed,
    });
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const { children, cardTitle } = this.props;
    const { windowHeight, sideBarCollapsed } = this.state;
    return (
      <Layout style={{ height: windowHeight }}>
        <Layout.Sider
          width={250}
          style={{ paddingTop: !sideBarCollapsed ? 'initial' : '2.063rem' }}
          collapsible
          collapsed={sideBarCollapsed}
          onCollapse={this.onCollapse}
          theme="light"
        >
          <div className="sidebar-logo-container">
            <Row justify="center" align="middle">
              <Col span={24} style={{ padding: sideBarCollapsed ? '1.25rem' : '4.063rem 5.063rem 0' }}>
                <img src="/assets/black-logo.png" className="logo" alt="logo" />
              </Col>
              <Col span={24}>
                {
                  !sideBarCollapsed
                    ? (
                      <>
                        <br />
                        <p style={{
                          color: '#d1d2d3', width: '100%', textAlign: 'center', marginBottom: '2rem',
                        }}
                        >
                          کانگەی داهێنانی زمانی کوردی
                        </p>

                      </>
                    ) : null
                }

              </Col>
            </Row>
          </div>
          <Menu theme="light" mode="vertical" defaultSelectedKeys={['ocr']}>
            <Menu.Item icon={<MdDocumentScanner className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="ocr">ناسینەوەی وێنە</Menu.Item>
            <Menu.Item icon={<GiSoundWaves className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="tts">نووسین بۆ دەنگ</Menu.Item>
            <Menu.Item icon={<AudioOutlined />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="stt"> دەنگ بۆ نووسین</Menu.Item>
            <Menu.Item icon={<RiUserSettingsLine className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="setting">رێکخستنەکان</Menu.Item>
            <Menu.Item icon={<MdOutlineLogout className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="logout"><a href="/api/auth/logout">چووەندەرەوە</a></Menu.Item>
          </Menu>
          {/* <Row>
            <Col span={24}>
              <Button size="large" block>سڵاوی جیهان</Button>
            </Col>
          </Row> */}
        </Layout.Sider>
        <Layout.Content style={{ padding: '50px 50px' }}>
          <Card
            title={cardTitle}
            className="custom-box-shadow"
            bordered
            style={{ height: '100%' }}
          >
            {children}
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}
export default Index;
