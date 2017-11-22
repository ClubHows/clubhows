import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from 'grommet/components/RadioButton';

const Option = ({ children, ...props }) => {
  return <RadioButton {...props}>{children}</RadioButton>;
};

Option.propTypes = {
  children: PropTypes.node
};

export default Option;
