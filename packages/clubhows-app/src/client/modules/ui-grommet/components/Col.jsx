import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet/components/Box';

const Col = ({ children, ...props }) => {
  return (
    <Box direction="column" {...props}>
      {children}
    </Box>
  );
};

Col.propTypes = {
  children: PropTypes.node
};

export default Col;
