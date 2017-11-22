import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';

const GButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

GButton.propTypes = {
  children: PropTypes.node
};

export default GButton;
