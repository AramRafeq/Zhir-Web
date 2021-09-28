module.exports = async ({ req, res }) => {
  const user = req.session.get('user');
  if (!user) {
    res.writeHead(302, { Location: '/auth/login' });
    res.end();
    return { props: {} };
  }
  return {
    props: { user },
  };
};
