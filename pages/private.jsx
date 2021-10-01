import React from 'react';
import { withIronSession } from 'next-iron-session';
import { Button } from 'antd';
import authGuard from '../helpers/authGuard';

export default function Home(props) {
  const { user } = props;
  return (
    <h1>
      Welcome

      {' '}
      {user.name}
      Auth Granted 🎉
      <br />

      <Button type="primary"><a href="/api/auth/logout">Logout</a></Button>
    </h1>
  );
}

export const getServerSideProps = withIronSession(authGuard,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });
