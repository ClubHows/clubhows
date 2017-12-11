import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '../../modules/common/components/web';
import Dashboard from './containers/Dashboard';
import reducers from './reducers';

import Feature from '../connector';

import { AuthNav, AuthRoute } from '../userMdb/containers/Auth';

export default new Feature({
  route: <AuthRoute exact path="/dashboard" component={Dashboard} />,
  navItem: (
    <MenuItem key="dashboard">
      <AuthNav scope="dashboard">
        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
          Dashboard
        </NavLink>
      </AuthNav>
    </MenuItem>
  ),
  reducer: { dashboard: reducers }
});
