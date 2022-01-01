import React from 'react';
import { withIronSession } from 'next-iron-session';
import { AiFillProfile } from 'react-icons/ai';
import { Tabs } from 'antd';
import Head from 'next/head';
import authGuard from '../../helpers/authGuard';
import Layout from '../../components/layout/Dashboard';
import ProfileForm from '../../components/setting/Profile';

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
    const { url, user } = this.props;
    return (
      <>
        <Head>
          <title>ژیر | داشبۆردی ژیر</title>

        </Head>
        <Layout
          url={url}
          cardTitle="بەڕێوەبردنی زانیاری کەسی"
        >
          {/* <Tabs tabPosition="right" defaultActiveKey="profile">
            <Tabs.TabPane
              tab={(
                <span>
                  <AiFillProfile style={TabIconStyle} />
                  زانیاری کەسی
                </span>
            )}
              key="profile"
            />
          </Tabs> */}
          <ProfileForm user={user} />
        </Layout>
      </>
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
