import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet/components/Box';
import { Text } from 'grommet/components/Text';

const Alert = ({ children, color, ...props }) => {
  if (color === 'error') {
    color = 'danger';
  }
  return (
    <Box {...props} color={color}>
      <Text>{children}</Text>
    </Box>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string
};

export default Alert;
