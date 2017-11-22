import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import CheckBox from 'grommet/components/CheckBox';
import Label from './Label';

const RenderCheckBox = ({ input, label, toggle, checked, type, onChange }) => {
  let color = 'normal';

  return (
    <Box color={color}>
      <Label>
        <CheckBox
          {...input}
          onChange={onChange}
          name={label}
          placeholder={label}
          checked={checked}
          toggle={toggle}
          type={type}
        />
        {label}
      </Label>
    </Box>
  );
};

RenderCheckBox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  toggle: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default RenderCheckBox;
