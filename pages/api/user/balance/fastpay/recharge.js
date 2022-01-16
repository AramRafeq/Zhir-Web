import superagent from 'superagent';
import { withIronSession } from 'next-iron-session';

async function requestHandler(req, res) {
  if (req.method === 'GET') {
    const user = await req.session.get('user');
    const amounts = [8000, 30000, 50000];
    const { amount } = req.query;
    const parsedAmount = parseInt(amount, 10) || 0;
    const serverAmount = amounts.indexOf(parsedAmount) > -1 ? parsedAmount : amounts[0];
    return superagent.get(`${process.env.API_URL}/payment/fastpay/recharge`)
      .query({
        amount: serverAmount,
      })
      .set('authorization', `Bearer ${user.token}`)
      .then(async (r) => {
        res.redirect(r.redirects[0]);
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
