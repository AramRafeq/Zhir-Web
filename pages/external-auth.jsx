import React, { useEffect, useState } from 'react';
import { withIronSession } from 'next-iron-session';
import Router from 'next/router';

import { Alert } from 'antd';
import Head from 'next/head';
import superagent from 'superagent';
import Loading from '../components/basic/Loading';

export default function Home(props) {
  const {
    query,
  } = props;
  //  auth state can have checking,error,requsting,success
  const [authState, setAuthState] = useState('checking');
  const checkServer = () => {
    superagent.post('/api/auth/external')
      .send(query).end((err) => {
        if (!err) {
          Router.push('/app');
        } else {
          setAuthState('error');
        }
      });
  };
  useEffect(() => {
    if (!query.hash || !query.method || !query.userId || !query.username) {
      setAuthState('error');
    } else {
      checkServer();
    }
  }, []);
  return (
    <>
      <Head>
        <title>ژیر | چوونەژوورەوەی سیستەمی دەرەکی</title>
      </Head>
      <Loading visible={authState === 'checking'} tip="تکایە چاوەڕوانبە..." />
      {authState === 'error' ? (
        <Alert
          type="error"
          style={{ textAlign: 'center' }}
          message={
            <h3>کێشەیەک هەیە لە زانیاری پێشنیارکراو تکایە دڵنیا بە لە دروستیان</h3>
        }
        />
      ) : null}
    </>
  );
}

export const getServerSideProps = withIronSession(async ({ req, query, res }) => {
  const userObject = req.session.get('user');
  if (userObject) {
    res.writeHead(302, { Location: '/app/ocr' });
    res.end();
  }

  return {
    props: {
      user: userObject || null,
      query,
    },

  };
},
{
  cookieName: process.env.COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.SESSION_SECRET,
});
