/* eslint-disable no-console */
import React, { Component } from 'react';
import Link from 'gatsby-link';
import { css } from 'emotion';
import Box from 'grommet/components/Box';
import Responsive from 'grommet/utils/Responsive';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import { Menu } from 'grommet-icons';
import colors from '../../utils/colors';

import { SignUpForm } from '../Forms';
import logo from '../../assets/clubhows-logo.png';

const logoStyle = css`
  width: 200px;
  height: 40px;
`;

const divider = css`
  display: block;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${colors.gray4};
  margin: 1rem 0 1rem 0;
`;

const mobileMenu = css`
  text-align: center;
  & a {
    text-align: center;
  }
`;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileActive: false,
      signupActive: false,
      mobile: false
    };
    this.onResponsive = this.onResponsive.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    this.responsive = Responsive.start(this.onResponsive);
  }

  componentWillUnmount() {
    this.responsive.stop();
  }

  onResponsive(small) {
    console.log(small);
    this.setState({ mobile: small });
  }

  toggleNav() {
    if (this.state.mobileActive) {
      this.setState({ mobileActive: false });
    } else {
      this.setState({ mobileActive: true });
    }
  }

  toggleSignUp = e => {
    e.preventDefault();
    this.setState(prevState => ({
      signupActive: !prevState.signupActive
    }));
  };

  render() {
    console.log(this.state);
    return (
      <Header fixed size="small">
        {!this.state.mobile && (
          <Box flex direction="row" justify="between">
            <Box
              flex="grow"
              direction="row"
              alignContent="center"
              alignSelf="center"
              justify="start"
            >
              <Box
                alignSelf="center"
                alignContent="center"
                justify="start"
                pad={{ horizontal: 'small', vertical: 'none' }}
              >
                <Link to="/">
                  <img src={logo} className={logoStyle} alt="ClubHows" />
                </Link>
              </Box>
            </Box>
            <Box
              flex="grow"
              direction="row"
              alignSelf="center"
              justify="end"
              wrap={false}
              align="center"
            >
              <Box
                pad={{ horizontal: 'medium', vertical: 'none' }}
                wrap={false}
              >
                <Link
                  to="/how-it-works"
                  style={{ textDecoration: 'none' }}
                  activeStyle={{ color: `${colors.accent}` }}
                >
                  How It Works
                </Link>
              </Box>
              <Box
                pad={{ horizontal: 'medium', vertical: 'none' }}
                wrap={false}
              >
                <Link to="/about">About ClubHows</Link>
              </Box>
              <Box
                pad={{ horizontal: 'medium', vertical: 'none' }}
                alignContent="center"
              >
                <Button secondary onClick={this.toggleSignUp}>
                  Sign up for Beta!
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {this.state.mobile && (
          <Box flex direction="row" justify="between">
            <Box
              flex="shrink"
              alignSelf="center"
              pad={{ horizontal: 'small', vertical: 'none' }}
            >
              <Link to="/">
                <img src={logo} className={logoStyle} alt="ClubHows" />
              </Link>
            </Box>
            <Box flex="shrink" alignSelf="center" pad="small">
              <Menu onClick={this.toggleNav} onKeyPress={this.toggleNav} />
            </Box>
          </Box>
        )}
        {this.state.signupActive && (
          <Layer
            flush
            closer
            onClose={this.toggleSignup}
            hidden={!this.state.signuptActive}
          >
            <div onCancel={this.toggleNav} onSubmit={this.toggleNav} />
            <Box pad="small" direction="column">
              <Box alignSelf="start">
                <Link to="/">
                  <img src={logo} className={logoStyle} alt="ClubHows" />
                </Link>
              </Box>
              <Box pad="medium" />
              <List margin="medium" pad="large" align="center">
                <ListItem separator="none" align="stretch">
                  <Link
                    to="/"
                    onClick={this.toggleNav}
                    onKeyPress={this.toggleNav}
                    className={mobileMenu}
                    style={{ display: 'inline-block' }}
                  >
                    <Heading tag="h3">Home</Heading>
                  </Link>
                </ListItem>
                <ListItem separator="none" textAlign="center">
                  <Link
                    to="/how-it-works"
                    onClick={this.toggleNav}
                    onKeyPress={this.toggleNav}
                    className={mobileMenu}
                  >
                    <Heading tag="h3">How It Works</Heading>
                  </Link>
                </ListItem>
                <ListItem separator="none" textAlign="center">
                  <Link
                    to="/about"
                    onClick={this.toggleNav}
                    onKeyPress={this.toggleNav}
                    className={mobileMenu}
                  >
                    <Heading tag="h3">About ClubHows</Heading>
                  </Link>
                </ListItem>
              </List>
              <Box className={divider} pad="medium" />
              <List selectable margin="medium" pad="large">
                <ListItem separator="none" flex align="center">
                  <Button onClick={this.toggleSignUp}>Sign up for Beta!</Button>
                </ListItem>
              </List>
            </Box>
          </Layer>
        )}
        {this.state.signupActive && (
          <Layer
            flush
            closer
            onClose={this.toggleSignUp}
            hidden={!this.state.signupActive}
          >
            <div onCancel={this.toggleSignUp} onSubmit={this.toggleSignUp} />
            <SignUpForm />
          </Layer>
        )}
      </Header>
    );
  }
}

export default Navigation;
