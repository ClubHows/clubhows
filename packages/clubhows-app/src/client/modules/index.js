import landing from './landing';
import dashboard from './dashboard';
import counter from './counter';
import post from './post';
import todo from './todo';
import team from './team';
// import upload from './upload';
import user from './userMdb';
import pageNotFound from './pageNotFound';
// import subscription from './subscription';
import './favicon';

import Feature from './connector';

export default new Feature(landing, dashboard, team, todo, counter, post, user, pageNotFound);
