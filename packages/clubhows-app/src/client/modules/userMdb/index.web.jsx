import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '../common/components/web';
import Profile from './containers/Profile';
import Users from './components/Users';
import UserEdit from './containers/UserEdit';
import Register from './containers/Register';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import reducers from './reducers';

import { AuthRoute, AuthNav, AuthLogout, AuthProfile, AuthLoggedInRoute } from './containers/Auth';

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
    <AuthLoggedInRoute exact path="/register" redirect="/profile" component={Register} />,
    <AuthLoggedInRoute exact path="/login" redirect="/profile" component={Login} />,
    <Route exact path="/forgot-password" component={ForgotPassword} />,
    <Route exact path="/reset-password/:token" component={ResetPassword} />
  ],
  navItem: [
    <MenuItem key="/users">
      <AuthNav scope="admin">
        <NavLink to="/users" className="nav-link" activeClassName="active">
          Users
        </NavLink>
      </AuthNav>
    </MenuItem>
  ],
  navItemRight: [
    <MenuItem key="/profile">
      <AuthNav scope="user">
        <AuthProfile />
      </AuthNav>
    </MenuItem>,
    <MenuItem key="/login">
      <AuthLogout>
        <NavLink to="/login" className="nav-link" activeClassName="active">
          Log In
        </NavLink>
      </AuthLogout>
    </MenuItem>
  ],
  reducer: { user: reducers },
  middleware: tokenMiddleware,
  afterware: tokenAfterware,
  connectionParam: connectionParam,
  // eslint-disable-next-line react/display-name
  rootComponentFactory: req => <CookiesProvider cookies={req ? req.universalCookies : undefined} />
});
