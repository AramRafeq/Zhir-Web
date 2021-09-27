import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.initialState = () => ({
      name: 'aram',
    });
    this.state = this.initialState();
  }

  render() {
    const { name } = this.state;
    return (
      <h1>
        inside class componnet
        {' '}
        {name}
      </h1>
    );
  }
}
export default Login;
