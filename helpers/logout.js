const superagent = require('superagent');

module.exports = () => {
  superagent.post('/api/auth/logout')
    .end(() => {

    });
};
