import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet/components/Heading';

const CardTitle = ({ children, ...props }) => {
  return <Heading {...props}>{children}</Heading>;
};

CardTitle.propTypes = {
  children: PropTypes.node
};

export default CardTitle;
