/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import { css } from 'emotion';

import Sidebar from '../components/Sidebar';

const pageTop = css`
  margin-top: 0rem;
`;

const Teams = () => {
  const something = 0;
  return (
    <Split flex="right" mt={something} className={pageTop}>
      <Sidebar />
      <Box margin={{ horizontal: 'none', vertical: 'medium' }} pad="large">
        <Heading tag="h1">Teams</Heading>
        <Heading tag="h3">What&apos;s Important: Your People</Heading>
        <p>This is an example showing the use of &quot;gatsby-image&quot;.</p>
      </Box>
    </Split>
  );
};

export default Teams;
