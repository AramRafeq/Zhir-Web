import React, { Suspense, lazy } from 'react';

import {
  Route, Switch, Link,
} from 'react-router-dom';
import Loading from './components/basic/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

const Login = lazy(() => import('./components/auth/Login'));
// const SS = lazy(() => import('./components/SS'));

export default () => (
  <>
    {/* <Link to="/">Home</Link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Link to="/ss">SS</Link>
    <Link to="/login">Login</Link> */}
    <SS />
    <Switch>
      {/* <ErrorBoundary> */}
      <Suspense fallback={<Loading visible tip=".... تکایە چاوەڕوانبە " />}>
        <Route exact path="/login" component={Login} />
        {/* <ProtectedRoute exact path="/ss" component={SS} /> */}
      </Suspense>
      {/* </ErrorBoundary> */}
    </Switch>
  </>
);
