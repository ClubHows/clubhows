import React from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';

const GSelect = ({ label, placeholder, inline, multiple, onSearch, onChange, children, ...props }) => {
  return (
    <Select
      {...props}
      placeholder={placeholder}
      inline={inline}
      multiple={multiple}
      options={children}
      onSearch={onSearch}
      onChange={onChange}
    />
  );
};

GSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  inline: PropTypes.bool,
  multiple: PropTypes.bool,
  onSearch: PropTypes.func,
  onChange: PropTypes.func
};

export default GSelect;
