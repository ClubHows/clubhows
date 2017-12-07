import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem } from '../common/components/web';
import Team from './containers/Team';
import reducers from './reducers';

import Feature from '../connector';

import { AuthRoute, AuthNav } from '../user/containers/Auth';

export default new Feature({
  route: <AuthRoute exact path="/team" scope="user" component={Team} />,
  navItem: (
    <AuthNav scope="user" key="/team">
      <ListItem key="/team">
        <NavLink to="/team" className="nav-link" activeClassName="active">
          Team
        </NavLink>
      </ListItem>
    </AuthNav>
  ),
  reducer: { team: reducers }
});
