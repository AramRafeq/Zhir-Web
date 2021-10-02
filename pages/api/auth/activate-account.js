import { withIronSession } from 'next-iron-session';
import superagent from 'superagent';

async function requestHandler(req, res) {
  if (req.method === 'GET') {
    const user = await req.session.get('user');
    if (!user) {
      return superagent.get(`${process.env.API_URL}/auth/activate-account`)
        .query({
          token: req.query.token,
        })
        .then(async (r) => {
          res.redirect(`/auth/login?account-status=${r.body.state}`);
        })
        .catch((err) => res.status(err.response.status).json(err.response.body));
    }
  }
  return res.status(401).send('you are already logged in');
}

export default withIronSession(requestHandler,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });
