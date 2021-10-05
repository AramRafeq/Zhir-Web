import React from 'react';
import { withIronSession } from 'next-iron-session';
import { Button } from 'antd';
import authGuard from '../../../helpers/authGuard';
import Layout from '../../../components/layout/Index';
import Login from '../../../components/auth/PasswordRecoveryForm';

class OCRIndex extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Layout cardTitle={(
        <Button.Group style={{ width: '100%' }}>
          <Button block>سڵاو جیهان</Button>
          <Button block>زانیاریەکانم</Button>
          <Button block>کڕین</Button>
        </Button.Group>
)}
      >
        <Login token="akjdwa" />
      </Layout>
    );
  }
}

export default OCRIndex;
export const getServerSideProps = withIronSession(authGuard,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });
