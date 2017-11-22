import team from './team';
import ui from './ui-grommet';
import counter from './counter';
import post from './post';
import upload from './upload';
import user from './user';
import pageNotFound from './pageNotFound';
import './favicon';

import Feature from './connector';

export default new Feature(team, counter, post, upload, user, ui, pageNotFound);
