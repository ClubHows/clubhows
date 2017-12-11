import React from 'react';
import PropTypes from 'prop-types';
import ADAvatar from 'antd/lib/avatar';

const Avatar = ({ children, icon, src, shape, size, ...props }) => {
  return (
    <ADAvatar icon={icon} src={src} size={size} shape={shape} {...props}>
      {children}
    </ADAvatar>
  );
};

Avatar.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.string,
  shape: PropTypes.string
};

export default Avatar;
