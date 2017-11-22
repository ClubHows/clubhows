import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet/components/Box';

const Row = ({ children, ...props }) => {
  return (
    <Box direction="row" {...props}>
      {children}
    </Box>
  );
};

Row.propTypes = {
  children: PropTypes.node
};

export default Row;
