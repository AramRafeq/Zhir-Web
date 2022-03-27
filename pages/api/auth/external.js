import { withIronSession } from 'next-iron-session';
import superagent from 'superagent';
import sha1 from 'sha1';

const allowedMethods = ['bradost'];
async function requestHandler(req, res) {
  if (req.method === 'POST') {
    const {
      method, username, userId, hash,
    } = req.body;
    if (allowedMethods.indexOf(method) > -1) {
      const calculatedHash = sha1(`${userId}${username}${method}${process.env.BRADOST_KEY}`);
      if (calculatedHash !== hash) {
        return res.status(401).json({ msg: 'zhir does not recognize this data' });
      }
      return superagent.post(`${process.env.API_URL}/auth/login`)
        .send({
          email: `${username}@zhir.io`,
          password: hash,
        })
        .then(async (r) => {
          req.session.set('user', r.body);
          await req.session.save();
          return res.status(200).json(r.body);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            // email not found or bad credentials try to register a new account
            return superagent.post(`${process.env.API_URL}/auth/register`)
              .send({
                name: username,
                company_name: method,
                email: `${username}@zhir.io`,
                password: hash,
                password_retype: hash,
                method,
              })
              .then(async () => superagent.post(`${process.env.API_URL}/auth/login`)
                .send({
                  email: `${username}@zhir.io`,
                  password: hash,
                })
                .then(async (r) => {
                  req.session.set('user', r.body);
                  await req.session.save();
                  return res.status(200).json(r.body);
                })
                .catch((err3) => res.status(err3.response.status).json(err3.response.body)))
              .catch((err2) => res.status(err2.response.status).json(err2.response.body));
          }
          return res.status(err.response.status).json(err.response.body);
        });
    }
    return res.status(401).json({ msg: 'zhir does not recognize this source' });
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
