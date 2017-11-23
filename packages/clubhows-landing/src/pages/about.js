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

const About = () => {
  const something = 0;
  return (
    <Split flex="right" mt={something} className={pageTop}>
      <Sidebar colorIndex="neutral-4-a" />
      <Box margin={{ horizontal: 'none', vertical: 'medium' }} pad="large">
        <Heading tag="h1">About ClubHows</Heading>
        <Heading tag="h3">Overview</Heading>
        <p>
          This project begin as an experiment to solving the real problems
          presented by a Boys & Girls club moving into a new clubhouse. The club
          went from a facility with it&apos;s own maintenace and janitorial
          management to being fully responsible for all the important details
          those service groups provide.
        </p>
      </Box>
    </Split>
  );
};

export default About;
