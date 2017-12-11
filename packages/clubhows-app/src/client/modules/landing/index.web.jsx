import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './containers/Landing';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: <Route exact path="/" component={Landing} />,
  reducer: { landing: reducers }
});
