import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Alert from './Alert';
import Label from './Label';

const RenderField = ({
  input,
  label,
  placeholder,
  inline,
  multiple,
  onSearch,
  onChange,
  children,
  meta: { touched, error }
}) => {
  let color = 'normal';
  if (touched && error) {
    color = 'danger';
  }

  return (
    <Box color={color}>
      {label && <Label>{label}</Label>}
      <div>
        <Select
          {...input}
          placeholder={placeholder}
          inline={inline}
          multiple={multiple}
          options={children}
          onSearch={onSearch}
          onChange={onChange}
        />
        {touched && (error && <Alert>{error}</Alert>)}
      </div>
    </Box>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node,
  inline: PropTypes.bool,
  multiple: PropTypes.bool,
  onSearch: PropTypes.func,
  onChange: PropTypes.func
};

export default RenderField;
