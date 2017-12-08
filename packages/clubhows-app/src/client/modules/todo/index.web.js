import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '../common/components/web';

import Todo from './containers/Todo';

import reducers from './reducers';

import Feature from '../connector';

import { AuthNav, AuthRoute } from '../userMdb/containers/Auth';

export default new Feature({
  route: [
    <AuthRoute exact path="/lists" component={Todo} />,
    <AuthRoute exact path="/lists/:id" component={Todo} />,
    <AuthRoute exact path="/list/:id" component={Todo} />
  ],
  navItem: (
    <MenuItem key="/lists">
      <AuthNav scope="user">
        <NavLink to="/lists" className="nav-link" activeClassName="active">
          Lists
        </NavLink>
      </AuthNav>
    </MenuItem>
  ),
  reducer: { todo: reducers }
});
