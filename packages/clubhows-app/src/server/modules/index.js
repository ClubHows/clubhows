import counter from './counter';
import post from './post';
import todo from './todo';
// import upload from './upload';
import user from './userMdb';
// import subscription from './subscription';
import mailer from './mailer';
import graphqlTypes from './graphqlTypes';
import apolloEngine from './apolloEngine';
import './debug';

import Feature from './connector';

export default new Feature(counter, post, todo, user, mailer, graphqlTypes, apolloEngine);
