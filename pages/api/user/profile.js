import { withIronSession } from 'next-iron-session';
import superagent from 'superagent';

async function requestHandler(req, res) {
  if (req.method === 'PUT') {
    const user = await req.session.get('user');
    return superagent.put(`${process.env.API_URL}/user`)
      .set('authorization', `Bearer ${user.token}`)
      .send(req.body)
      .then(async (r) => {
        const newUserObject = {
          ...user,
          ...req.body,
          password: undefined,
          password_retype: undefined,
        };
        req.session.set('user', newUserObject);
        await req.session.save();
        return res.status(r.status).json(r.body);
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
