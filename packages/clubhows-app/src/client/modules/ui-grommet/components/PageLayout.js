import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grommet, Grid, Box, Button, Responsive, Layer } from 'grommet';
import { Close, Menu } from 'grommet-icons';
import { NavLink } from 'react-router-dom';
// import { App, Header, Footer, Split, Box, Menu, Anchor } from 'grommet';
// import { hpe } from 'grommet/themes';
import log from '../../../../common/log';
import '../style.less';
import { MainMenu } from './MainMenu';

export class PageLayout extends Component {
  static childContextTypes = {
    currentTheme: PropTypes.string
  };

  state = {
    theme: 'hpe',
    responsiveState: 'wide',
    showLayer: false
  };

  getChildContext() {
    return {
      currentTheme: this.state.theme
    };
  }

  ccomponentDidMount() {
    window.scrollTo(0, 0);
  }

  onResponsiveChange = responsiveState => {
    this.setState({ responsiveState });
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      showLayer: !prevState.showLayer
    }));
  };

  render() {
    const { children } = this.props;
    const { responsiveState, showLayer } = this.state;
    log(responsiveState);

    let footer = (
      <Box tag="footer" gridArea="footer" direction="row" align="center" alignSelf="center" pad="small">
        &copy; 2017. ClubHows.
      </Box>
    );

    let mobileHeader;
    if (responsiveState === 'narrow' && !showLayer) {
      mobileHeader = (
        <Box tag="header" gridArea="header" direction="row" pad="small" justify="between" animation="fadeIn">
          <Box align="start">
            <NavLink to="/">
              <img src="/clubhows-logo.png" width="200" height="40" alt="ClubHows" />
            </NavLink>
          </Box>
          <Box align="end">
            <Button icon={<Menu />} onClick={this.toggleMenu} />
          </Box>
        </Box>
      );
    }

    let layer;
    let menu;
    let rows = ['xsmall', 'medium', 'xsmall'];
    let grid = ['full'];
    let area = 'main';
    let areas = [
      { name: 'header', start: [0, 0], end: [1, 0] },
      { name: 'main', start: [0, 1], end: [1, 1] },
      { name: 'footer', start: [0, 2], end: [1, 2] }
    ];
    if (responsiveState !== 'narrow') {
      rows = ['full'];
      grid = ['1/4', '3/4'];
      area = '';
      areas = [{ name: 'header', start: [0], end: [0] }, { name: 'main', start: [1], end: [0] }];
      menu = (
        <Box direction="column" full="vertical" flex="grow" justify="between">
          <Box align="start">
            <NavLink to="/">
              <img src="/clubhows-logo.png" width="200" height="40" alt="ClubHows" />
            </NavLink>
          </Box>
          <MainMenu />
          <Box tag="footer" direction="row" alignSelf="start" pad="medium">
            &copy; 2017. ClubHows.
          </Box>
        </Box>
      );
    }

    if (responsiveState === 'narrow' && showLayer) {
      layer = (
        <Layer position="center" onEsc={this.close} size="medium" animation="fadeIn">
          <Box tag="header" direction="row" pad="medium" justify="between">
            <Box align="start">
              <NavLink to="/">
                <img src="/clubhows-logo.png" width="200" height="40" alt="ClubHows" />
              </NavLink>
            </Box>
            <Box align="end">
              <Button icon={<Close />} onClick={this.toggleMenu} />
            </Box>
          </Box>
          <Box direction="column" full="vertical" flex="grow" align="center">
            <MainMenu />
          </Box>
        </Layer>
      );
    }

    return (
      <Grommet>
        <Responsive onChange={this.onResponsiveChange}>
          <Grid rows={rows} columns={grid} areas={areas} gap="none">
            {menu}
            {mobileHeader}
            <Box gridArea={area} flex="grow" direction="column" full="vertical" animation="fadeIn">
              {children}
            </Box>
            {responsiveState === 'narrow' ? footer : ''}
          </Grid>
        </Responsive>
        {layer}
      </Grommet>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node
};

export default PageLayout;
