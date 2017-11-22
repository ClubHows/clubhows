import React from 'react';
import { Box } from 'grommet';

import ListGroup from './ListGroup';

import modules from '../../../modules';

export const MainMenu = () => {
  return (
    <div>
      <Box direction="column" basis="1" pad="medium" textAlign="center">
        <ListGroup>{modules.navItem}</ListGroup>
        <ListGroup>{modules.navItemRight}</ListGroup>
      </Box>
    </div>
  );
};

export default MainMenu;
