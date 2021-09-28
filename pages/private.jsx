import React from 'react';
import { withIronSession } from 'next-iron-session';
import { Button } from 'antd';
import authGuard from '../helpers/authGuard';

export default function Home() {
  return (
    <h1>
      <Button type="primary">Auth Granted 🎉</Button>
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
