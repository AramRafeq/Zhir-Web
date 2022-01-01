import React from 'react';
import {
  Layout, Menu, Card, Avatar,
} from 'antd';
import debounce from 'lodash/debounce';
// import {
//   AudioOutlined,
// } from '@ant-design/icons';
import { RiUserSettingsLine } from 'react-icons/ri';
import { MdDocumentScanner, MdOutlineLogout } from 'react-icons/md';
// import { GiSoundWaves } from 'react-icons/gi';

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
      this.setState({ windowHeight: window.innerHeight });
    }, 300);
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
    const { windowHeight } = this.state;
    return (
      <Layout style={{ minHeight: windowHeight }}>
        <Layout.Header>
          <Menu style={{ fontWeight: 200 }} theme="dark" mode="horizontal" defaultSelectedKeys={[url]}>
            <Menu.Item key="avatar-logo">
              <a href="/">
                <Avatar src="/assets/white-logo.png" />
              </a>
            </Menu.Item>
            <Menu.Item icon={<MdDocumentScanner className="custom-icon" />} key="/app/ocr">
              <a href="/app/ocr">ناسینەوەی وێنە</a>
            </Menu.Item>
            {/* <Menu.Item icon={<GiSoundWaves className="custom-icon" />} key="/app/tts">
              <a href="/app/tts"> نووسین بۆ دەنگ</a>
            </Menu.Item>
            <Menu.Item icon={<AudioOutlined />} key="/app/stt">
              <a href="/app/stt"> دەنگ بۆ نووسین</a>
            </Menu.Item> */}
            <Menu.Item icon={<RiUserSettingsLine className="custom-icon" />} key="/app/profile">
              <a href="/app/profile">پرۆفایلەکەم</a>
            </Menu.Item>
            <Menu.Item style={{ color: 'red' }} icon={<MdOutlineLogout className="custom-icon" />} key="/app/logout">
              <a href="/api/auth/logout" style={{ color: 'red' }}>چووەندەرەوە</a>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout>

          <Layout.Content className="layout-content-dashboard" style={{ padding: '50px 50px' }}>
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
      </Layout>
    );
  }
}
export default Index;
