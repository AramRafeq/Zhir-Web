import { withIronSession } from 'next-iron-session';

async function requestHandler(req, res) {
  if (req.method === 'GET') {
    req.session.destroy();
    return res.redirect('/');
  }
  return res.status(404).send('');
}

export default withIronSession(requestHandler,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });
