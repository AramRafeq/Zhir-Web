import React from 'react';
import { withIronSession } from 'next-iron-session';
import authGuard from '../../helpers/authGuard';

import Layout from '../../components/layout/Index';
import Login from '../../components/auth/PasswordRecoveryForm';

class OCR extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Layout>
        <Login token="akjdwa" />
      </Layout>
    );
  }
}

export default OCR;
export const getServerSideProps = withIronSession(authGuard,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });
