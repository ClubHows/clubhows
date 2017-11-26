import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Link from 'gatsby-link';
import { css } from 'emotion';

import colors from '../../utils/colors';

const sidebar = css`
  div & {
    ul & {
      li & {
        a & {
          color: ${colors.secondary};
          &:hover {
            color: ${colors.cyan2};
          }
        }
      }
    }
  }
`;

const Sidebar = () => (
  <Box
    full="vertical"
    colorIndex="brand"
    justify="start"
    align="start"
    wrap
    pad={{ horizontal: 'large', vertical: 'medium' }}
    className={sidebar}
  >
    <Heading tag="h3" margin="small">
      How It Works
    </Heading>
    <List selectable>
      <ListItem justify="between" separator="horizontal">
        <Link to="/how-it-works">Overview</Link>
      </ListItem>
      <ListItem justify="between">
        <Link to="/teams">Teams</Link>
      </ListItem>
      <ListItem justify="between">
        <Link to="/locations">Locations</Link>
      </ListItem>
      <ListItem justify="between">
        <Link to="/lists">Lists</Link>
      </ListItem>
    </List>
    <List selectable>
      <ListItem justify="between" separator="horizontal">
        <Link to="/about">Overview</Link>
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
