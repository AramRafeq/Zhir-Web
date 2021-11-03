import React from 'react';
import { withIronSession } from 'next-iron-session';
import Head from 'next/head';
import authGuard from '../../../helpers/authGuard';
import Layout from '../../../components/layout/Dashboard';
import CommingSoon from '../../../components/commingsoon/index';

class TTSIndex extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { url } = this.props;
    return (
      <>
        <Head>
          <title>ژیر | داشبۆردی ژیر</title>

        </Head>
        <Layout
          url={url}
          cardTitle="نووسین بۆ دەنگ"
        >
          <CommingSoon />
        </Layout>
      </>
    );
  }
}

export default TTSIndex;
export const getServerSideProps = withIronSession(authGuard,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });
