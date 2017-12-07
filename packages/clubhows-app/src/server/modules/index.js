import team from './team';
import counter from './counter';
import post from './post';
import todo from './todo';
import upload from './upload';
import user from './user';
import mailer from './mailer';
import graphqlTypes from './graphqlTypes';
import apolloEngine from './apolloEngine';
import './debug';

import Feature from './connector';

export default new Feature(team, counter, post, todo, upload, user, mailer, graphqlTypes, apolloEngine);
