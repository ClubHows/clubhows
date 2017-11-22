import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet/components/Anchor';

const MenuItem = ({ children, ...props }) => {
  return <Anchor {...props}>{children}</Anchor>;
};

MenuItem.propTypes = {
  children: PropTypes.node
};

export default MenuItem;
