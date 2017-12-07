import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { ListItem } from '../common/components/web';

import Todo from './containers/Todo';

import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: [
    <Route exact path="/lists" component={Todo} />,
    <Route exact path="/lists/:id" component={Todo} />,
    <Route exact path="/list/:id" component={Todo} />
  ],
  navItem: (
    <ListItem key="/lists">
      <NavLink to="/lists" className="nav-link" activeClassName="active">
        Lists
      </NavLink>
    </ListItem>
  ),
  reducer: { todo: reducers }
});
