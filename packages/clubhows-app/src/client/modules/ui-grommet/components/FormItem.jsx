import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Label from './Label';

const FormItem = ({ children, label, labelSize = 'medium', ...props }) => {
  return (
    <Box {...props}>
      {label && <Label size={labelSize}>{label}:&nbsp;</Label>}
      {children}
    </Box>
  );
};

FormItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  labelSize: PropTypes.string
};

export default FormItem;
