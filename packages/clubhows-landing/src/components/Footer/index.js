/* eslint-disable no-console */
import React, { Component } from 'react';
import { css } from 'react-emotion';
import Link from 'gatsby-link';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Layer from 'grommet/components/Layer';
import { Github, Mail, Twitter } from 'grommet-icons';
import colors from '../../utils/colors';
import logo from '../../assets/clubhows-logo.png';
import { ContactForm } from '../Forms';

const logoFooter = css`
  width: 12rem;
`;

const copyright = css`
  font-size: 0.8rem;
  color: ${colors.gray7};
  text-align: right;
`;

export class FooterNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactActive: false
    };
  }

  toggleContact = e => {
    e.preventDefault();
    this.setState(prevState => ({
      contactActive: !prevState.contactActive
    }));
  };

  render() {
    return (
      <Footer colorIndex="grey-1-a" size="small" pad="medium">
        <Box
          direction="column"
          justify="between"
          basis="2/3"
          pad="medium"
          alignself="end"
        >
          <Box
            justify="start"
            direction="row"
            wrap={false}
            flex="grow"
            basis="3/4"
            alignSelf="start"
          >
            <Box margin={{ horizontal: 'medium', vertical: 'none' }}>
              <Link to="/">Home</Link>
            </Box>
            <Box margin={{ horizontal: 'medium', vertical: 'none' }}>
              <Link to="/privacy">Privacy Policy</Link>
            </Box>
            <Box margin={{ horizontal: 'medium', vertical: 'none' }}>
              <Link to="/terms">Terms of Service</Link>
            </Box>
          </Box>
          <Box
            direction="row"
            justify="start"
            wrap={false}
            flex="grow"
            pad="small"
          >
            <Box>
              <Anchor
                icon={<Mail />}
                onClick={this.toggleContact}
                id="mailContact"
              />
            </Box>
            <Box>
              <Anchor icon={<Twitter />} href="https://twitter.com/club_hows" />
            </Box>
            <Box>
              <Anchor icon={<Github />} href="https://github.com/clubhows" />
            </Box>
          </Box>
        </Box>
        <Box flex direction="row" justify="end" basis="1/4" pad="medium">
          <Box flex direction="column" align="end">
            <Box>
              <a href="/">
                <img src={logo} alt="ClubHows" className={logoFooter} />
              </a>
            </Box>
            <Box wrap flex="shrink" align="end">
              <Paragraph className={copyright}>
                {`Copyright © 2017 ClubHows. All rights reserved.`}
              </Paragraph>
            </Box>
          </Box>
        </Box>

        {this.state.contactActive && (
          <Layer
            flush
            closer
            onClose={this.toggleContact}
            hidden={!this.state.contactActive}
          >
            <div onCancel={this.toggleContact} onSubmit={this.toggleContact} />
            <ContactForm />
          </Layer>
        )}
      </Footer>
    );
  }
}

export default FooterNav;
