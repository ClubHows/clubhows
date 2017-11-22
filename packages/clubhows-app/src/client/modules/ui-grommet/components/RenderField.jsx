import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import TextInput from 'grommet/components/TextInput';

import Label from './Label';

const RenderField = ({ input, label, type, meta: { touched, error } }) => {
  let valid = null;
  if (touched && error) {
    valid = false;
  }

  return (
    <Box>
      {label && <Label>{label}</Label>}
      <div>
        <TextInput {...input} placeholder={label} type={type} valid={valid} />
        {touched && (error && <Box>{error}</Box>)}
      </div>
    </Box>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderField;
