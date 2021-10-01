import { withIronSession } from 'next-iron-session';
import superagent from 'superagent';

async function requestHandler(req, res) {
  if (req.method === 'POST') {
    const user = await req.session.get('user');
    if (!user) {
      return superagent.post(`${process.env.API_URL}/auth/request-password-recovery`)
        .send({
          email: req.body.email,
        })
        .then(async () => res.status(200).json({ msg: 'success' }))
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
