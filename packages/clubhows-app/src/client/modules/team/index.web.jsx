import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { ListItem } from '../common/components/web';
import Team from './containers/Team';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: <Route exact path="/team" component={Team} />,
  navItem: (
    <ListItem key="/team">
      <NavLink to="/team" className="nav-link" activeClassName="active">
        Team
      </NavLink>
    </ListItem>
  ),
  reducer: { team: reducers }
});
