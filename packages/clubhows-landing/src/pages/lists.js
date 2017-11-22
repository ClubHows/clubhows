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

const Lists = () => {
  const something = 0;
  return (
    <Split flex="right" mt={something} className={pageTop}>
      <Sidebar />
      <Box margin={{ horizontal: 'none', vertical: 'medium' }} pad="large">
        <Heading tag="h1">Lists</Heading>
        <Heading tag="h3">The Key to Easy Documentation</Heading>
        <p>This is an example showing the use of &quot;gatsby-image&quot;.</p>
      </Box>
    </Split>
  );
};

export default Lists;
