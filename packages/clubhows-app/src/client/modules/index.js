import counter from './counter';
import post from './post';
import todo from './todo';
// import upload from './upload';
import user from './userMdb';
import pageNotFound from './pageNotFound';
// import subscription from './subscription';
import './favicon';

import Feature from './connector';

export default new Feature(counter, post, todo, user, pageNotFound);
