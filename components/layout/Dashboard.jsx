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
        this.setState({ sideBarCollapsed: true });
      } else {
        this.setState({ sideBarCollapsed: false });
      }
    }, 300);
    this.onCollapse = (collapsed) => {
      this.setState({ sideBarCollapsed: collapsed });
    };
  }

  componentDidMount() {
    this.setState({
      windowHeight: window.innerHeight,
    });
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const { children, cardTitle, url } = this.props;
    const { windowHeight, sideBarCollapsed } = this.state;
    return (
      <Layout style={{ minHeight: windowHeight }}>
        <Layout.Sider
          width={250}
          style={{ paddingTop: !sideBarCollapsed ? 'initial' : '2.063rem' }}
          collapsible
          collapsed={sideBarCollapsed}
          onCollapse={this.onCollapse}
          theme="dark"
        >
          <div className="sidebar-logo-container">
            <Row justify="center" align="middle">
              <Col span={24} style={{ padding: sideBarCollapsed ? '1.25rem' : '4.063rem 5.063rem 0' }}>
                <a href="/">
                  <img src="/assets/white-logo.png" className="logo" alt="logo" />
                </a>
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
                        />

                      </>
                    ) : null
                }

              </Col>
            </Row>
          </div>
          <Menu style={{ fontWeight: 200 }} theme="dark" mode="vertical" defaultSelectedKeys={[url]}>
            <Menu.Item icon={<MdDocumentScanner className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="/app/ocr">
              <a href="/app/ocr">ناسینەوەی وێنە</a>
            </Menu.Item>
            <Menu.Item icon={<GiSoundWaves className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="/app/tts">
              <a href="/app/tts"> نووسین بۆ دەنگ</a>

            </Menu.Item>
            <Menu.Item icon={<AudioOutlined />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="/app/stt">
              <a href="/app/stt"> دەنگ بۆ نووسین</a>
            </Menu.Item>
            <Menu.Item icon={<RiUserSettingsLine className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="/app/profile">

              <a href="/app/profile">پرۆفایلەکەم</a>
            </Menu.Item>
            <Menu.Item style={{ color: 'red' }} icon={<MdOutlineLogout className="custom-icon" />} className={classnames({ 'dashboard-menu-item': !sideBarCollapsed })} key="/app/logout">
              <a href="/api/auth/logout" style={{ color: 'red' }}>چووەندەرەوە</a>
            </Menu.Item>
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
            style={{ minHeight: '100%' }}
          >
            {children}
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}
export default Index;
