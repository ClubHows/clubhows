import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from 'antd';

import modules from '../../../../../../modules';
import log from '../../../../../../../common/log';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
`;

const StyledNavLink = styled(NavLink)`
  width: 150px;
  height: 30px;
  margin: 0;
  line-height: 2rem;
  align-self: center;
`;

class NavBar extends React.Component {
  state = {
    current: '/'
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    log('Antd NavBar 25:', this.props.location);
    return (
      <StyledHeader style={{ flex: 'space-between' }}>
        <StyledNavLink to="/" className="nav-link logo">
          <img src="/clubhows-logo.png" width="150" height="30" alt="ClubHows" />
        </StyledNavLink>
        {modules.navItemsRight}
      </StyledHeader>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
