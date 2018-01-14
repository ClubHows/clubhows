import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '../common/components/web';
import Team from './containers/Team';
import reducers from './reducers';

import Feature from '../connector';

import { AuthRoute, AuthNav } from '../user/containers/Auth';

export default new Feature({
  route: <AuthRoute exact path="/team" scope="user" component={Team} />,
  navItem: (
    <MenuItem key="/team">
      <AuthNav scope="user">
        <NavLink to="/team" className="nav-link" activeClassName="active">
          Team
        </NavLink>
      </AuthNav>
    </MenuItem>
  ),
  reducer: { team: reducers }
});
