import React from 'react';
import PropTypes from 'prop-types';
import Text from 'grommet/components/Text';

const Label = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>;
};

Label.propTypes = {
  children: PropTypes.node
};

export default Label;
