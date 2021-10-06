import React from 'react';
import { withIronSession } from 'next-iron-session';
import { AiFillApi, AiFillProfile } from 'react-icons/ai';
import { Tabs } from 'antd';
import authGuard from '../../helpers/authGuard';
import Layout from '../../components/layout/Index';
import PasswordRecoveryForm from '../../components/auth/PasswordRecoveryForm';
import PasswordRecoverySuccess from '../../components/auth/PasswordRecoverySuccess';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const TabIconStyle = {
      fontSize: 15,
      marginLeft: 5,
      marginBottom: -5,
    };
    const { url } = this.props;
    return (
      <Layout
        url={url}
        cardTitle="بەڕێوەبردنی زانیاری کەسی و کڕینی باڵانس"
      >
        <Tabs tabPosition="right" defaultActiveKey="profile">
          <Tabs.TabPane
            tab={(
              <span>
                <AiFillProfile style={TabIconStyle} />
                زانیاری کەسی
              </span>
            )}
            key="profile"
          >
            <PasswordRecoveryForm token="dwa" />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={(
              <span>
                <AiFillApi style={TabIconStyle} />
                بۆ گەشەپێدەران
              </span>
            )}
            key="for-devs"
          >
            <PasswordRecoverySuccess />
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    );
  }
}

export default Profile;
export const getServerSideProps = withIronSession(authGuard,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });