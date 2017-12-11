import React from 'react';
import PropTypes from 'prop-types';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import Layout from 'antd/lib/layout';
import styled from 'styled-components';

import NavBar from './NavBar';
import NavSider from './NavSider';
import settings from '../../../../../../../../settings';

const { Content, Sider, Footer } = Layout;

const StyledSider = styled(Sider)`
  height: 100vh;
  overflow: auto;
  position: fixed;
  left: 0;
  border-right: 1px solid #e8e8e8;
`;

const StyledContent = styled(Content)`
  height: 100vh;
  overflow: initial;
  border-right: 1px solid #e8e8e8;
  padding: 4rem;
`;

const StyledFooter = styled(Footer)`
  border-top: 1px solid #e8e8e8;
  text-align: center;
  clear: both;
`;

const PageLayout = ({ children, navBar, navSider }) => {
  return (
    <LocaleProvider locale={enUS}>
      <Layout style={{ minHeight: '100vh' }}>
        {navBar !== false && <NavBar />}
        <Layout>
          {navSider !== false ? (
            <StyledSider
              breakpoint="sm"
              collapsedWidth="0"
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <NavSider />
            </StyledSider>
          ) : null}
          <Layout>
            <StyledContent id="content">{children}</StyledContent>
            <StyledFooter>&copy; 2017. {settings.app.name}.</StyledFooter>
          </Layout>
        </Layout>
      </Layout>
    </LocaleProvider>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  navSider: PropTypes.bool
};

export default PageLayout;
