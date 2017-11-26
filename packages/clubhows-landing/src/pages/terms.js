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

const Terms = () => (
  <Split flex="right" mt={something} className={pageTop}>
    <Sidebar colorIndex="neutral-4-a" />
    <Box margin={{ horizontal: 'none', vertical: 'medium' }} pad="large">
      <Heading tag="h1">Terms of Use</Heading>
      <Heading tag="h3">Overview</Heading>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </p>
    </Box>
  </Split>
);

export default Terms;
