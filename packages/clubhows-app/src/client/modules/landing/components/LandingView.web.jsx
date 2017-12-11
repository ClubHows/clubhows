import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { PageLayout } from '../../common/components/web';

const LandingContainer = styled.div`
  display: block;
  margin: 0 auto;
  padding: 12rem 0;
  text-align: center;
`;

const renderMetaData = () => (
  <Helmet
    title="Landing"
    meta={[
      {
        name: 'description',
        content: 'Landing page'
      }
    ]}
  />
);

const LandingView = () => {
  return (
    <PageLayout>
      {renderMetaData()}
      <LandingContainer>
        <img src="/clubhows-logo.png" width="200" height="40" alt="ClubHows" />
      </LandingContainer>
    </PageLayout>
  );
};

export default LandingView;
