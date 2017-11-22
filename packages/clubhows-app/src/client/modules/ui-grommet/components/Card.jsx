import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet/components/Box';

const Card = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
