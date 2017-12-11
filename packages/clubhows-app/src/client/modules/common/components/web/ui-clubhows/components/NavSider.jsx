import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Menu from 'antd/lib/menu';

import modules from '../../../../../../modules';

const StyledMenu = styled(Menu)`
  line-height: 2rem;
  border: none;
`;

class NavSider extends React.Component {
  state = {
    current: '/'
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <StyledMenu onClick={this.handleClick} selectedKeys={[this.props.location.pathname]} mode="inline" theme="light">
        {modules.navItems}
      </StyledMenu>
    );
  }
}

NavSider.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavSider);
