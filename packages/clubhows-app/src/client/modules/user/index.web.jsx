import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { ListItem } from '../common/components/web';
import Profile from './containers/Profile';
import Users from './components/Users';
import UserEdit from './containers/UserEdit';
import Register from './containers/Register';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import reducers from './reducers';

import { AuthRoute, AuthNav, AuthLogin, AuthProfile } from './containers/Auth';

import Feature from '../connector';

function tokenMiddleware(req, options, next) {
  options.headers['x-token'] = window.localStorage.getItem('token');
  options.headers['x-refresh-token'] = window.localStorage.getItem('refreshToken');
  next();
}

function tokenAfterware(res, options, next) {
  const token = options.headers['x-token'];
  const refreshToken = options.headers['x-refresh-token'];
  if (token) {
    window.localStorage.setItem('token', token);
  }
  if (refreshToken) {
    window.localStorage.setItem('refreshToken', refreshToken);
  }
  next();
}

function connectionParam() {
  return {
    token: window.localStorage.getItem('token'),
    refreshToken: window.localStorage.getItem('refreshToken')
  };
}

export default new Feature({
  route: [
    <AuthRoute exact path="/profile" scope="user" component={Profile} />,
    <AuthRoute exact path="/users" scope="admin" component={Users} />,
    <Route exact path="/users/:id" component={UserEdit} />,
    <Route exact path="/register" component={Register} />,
    <Route exact path="/login" component={Login} />,
    <Route exact path="/forgot-password" component={ForgotPassword} />,
    <Route exact path="/reset-password/:token" component={ResetPassword} />
  ],
  navItem: [
    <AuthNav scope="admin" key="/users">
      <ListItem key="/users">
        <NavLink to="/users" className="nav-link" activeClassName="active">
          Users
        </NavLink>
      </ListItem>
    </AuthNav>
  ],
  navItemRight: [
    <AuthNav scope="user" key="/profile">
      <ListItem key="/profile">
        <AuthProfile />
      </ListItem>
    </AuthNav>,
    <ListItem key="login">
      <AuthLogin>
        <span className="nav-link">
          <NavLink to="/login" activeClassName="active">
            Log In
          </NavLink>
        </span>
      </AuthLogin>
    </ListItem>
  ],
  reducer: { user: reducers },
  middleware: tokenMiddleware,
  afterware: tokenAfterware,
  connectionParam: connectionParam
});
