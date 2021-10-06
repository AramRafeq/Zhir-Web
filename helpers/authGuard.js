module.exports = async ({ req, res }) => {
  const { url } = req;
  const user = req.session.get('user');
  if (!user) {
    res.writeHead(302, { Location: '/auth/login' });
    res.end();
    return { props: { url } };
  }
  return {
    props: { user, url },
  };
};
