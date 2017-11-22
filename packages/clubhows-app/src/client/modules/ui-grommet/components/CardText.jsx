import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet/components/Text';

const CardText = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>;
};

CardText.propTypes = {
  children: PropTypes.node
};

export default CardText;
