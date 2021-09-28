import { withIronSession } from 'next-iron-session';
import superagent from 'superagent';

async function requestHandler(req, res) {
  if (req.method === 'POST') {
    return superagent.post(`${process.env.API_URL}/auth/login`)
      .send({
        email: req.body.email,
        password: req.body.password,
      })
      .then(async (r) => {
        req.session.set('user', r.body);
        await req.session.save();
        return res.status(200).json(r.body);
      })
      .catch((err) => res.status(err.response.status).json(err.response.body));
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
