import React from 'react';
import { withIronSession } from 'next-iron-session';

export default function Home() {
  return (
    <h1>
      Hello world Login Page
    </h1>
  );
}

console.log();

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get('user');
  if (user) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return { props: {} };
  }

  return {
    props: { },
  };
},
{
  cookieName: process.env.COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.SESSION_SECRET,
});
