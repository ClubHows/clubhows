import React from 'react';
import PropTypes from 'prop-types';
import { App } from 'grommet';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/* eslint-disable */
import normalize from 'normalize.css';
/* eslint-enable */
import '../components/style/theme.css';

const Layout = ({ children }) => (
  <App centered={false}>
    <Navigation />
    {children()}
    <Footer />
  </App>
);

Layout.propTypes = {
  children: PropTypes.func.isRequired
};

export default Layout;
