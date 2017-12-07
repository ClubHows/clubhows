import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { PageLayout, Row, Col } from '../../common/components/web';

const renderMetaData = () => (
  <Helmet
    title="Team"
    meta={[
      {
        name: 'description',
        content: 'Team page'
      }
    ]}
  />
);

const TeamView = ({ loading, currentUser }) => {
  if (loading && !currentUser) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">Loading...</div>
      </PageLayout>
    );
  } else if (currentUser) {
    return (
      <PageLayout>
        {renderMetaData()}
        <Row>
          <Col xs={{ size: 6, offset: 3 }}>
            <h1 className="text-center">Your Team</h1>
            <p>User ID: {currentUser.id}</p>
          </Col>
        </Row>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {renderMetaData()}
        <h2>No current user logged in</h2>
      </PageLayout>
    );
  }
};

TeamView.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object
};

export default TeamView;
