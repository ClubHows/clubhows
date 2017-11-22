import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { ListItem } from '../common/components/web';

import Post from './containers/Post';
import PostEdit from './containers/PostEdit';

import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: [<Route exact path="/posts" component={Post} />, <Route exact path="/post/:id" component={PostEdit} />],
  navItem: (
    <ListItem key="/posts">
      <NavLink to="/posts" className="nav-link" activeClassName="active">
        Posts
      </NavLink>
    </ListItem>
  ),
  reducer: { post: reducers }
});
