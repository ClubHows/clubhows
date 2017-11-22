/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import { css } from 'emotion';

const pageTop = css`
  margin-top: 3.5rem;
`;

const About = () => {
  const something = 0;
  return (
    <Split flex="right" mt={something} className={pageTop}>
      <Box
        full="vertical"
        colorIndex="brand"
        justify="start"
        align="start"
        wrap
        pad="medium"
      >
        <Heading tag="h3" margin="small">
          How It Works
        </Heading>
        <List selectable>
          <ListItem justify="between" separator="horizontal">
            Teams
          </ListItem>
          <ListItem justify="between">Locations</ListItem>
        </List>
      </Box>
      <Box margin={{ horizontal: 'none', vertical: 'large' }} pad="large">
        <h1>About</h1>
        <p>This is an example showing the use of &quot;gatsby-image&quot;.</p>
      </Box>
    </Split>
  );
};

export default About;
