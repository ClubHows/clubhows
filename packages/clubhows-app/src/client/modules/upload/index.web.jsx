import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { constructUploadOptions } from 'apollo-fetch-upload';
import { ListItem } from '../common/components/web';

// Component and helpers
import Upload from './containers/Upload';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: <Route exact path="/upload" component={Upload} />,
  navItem: (
    <ListItem key="/upload">
      <NavLink to="/upload" className="nav-link" activeClassName="active">
        Upload
      </NavLink>
    </ListItem>
  ),
  reducer: { upload: reducers },
  createFetchOptions: constructUploadOptions
});
