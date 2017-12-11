import React from 'react';
import Landing from './containers/Landing';
import reducers from './reducers';

import Feature from '../connector';

import { AuthLoggedInRoute } from '../userMdb/containers/Auth';

export default new Feature({
  route: <AuthLoggedInRoute exact path="/" redirect="/dashboard" component={Landing} />,
  reducer: { landing: reducers }
});
