import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { PageLayout, Row, Col } from '../../common/components/web';

import TeamAddForm from './TeamAddForm';

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

const onSubmit = addTeam => values => {
  addTeam(values.name);
};

const TeamView = ({ loading, currentUser, currentTeam, addTeam }) => {
  if (loading && !currentUser) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">Loading...</div>
      </PageLayout>
    );
  } else if (_.get(currentTeam, ['_id'])) {
    return (
      <PageLayout>
        {renderMetaData()}
        <Row>
          <Col>
            <h1 className="text-center">Team: {currentTeam.name}</h1>
            <p>Team ID: {currentTeam._id}</p>
          </Col>
        </Row>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {renderMetaData()}
        <h2>You don&rsquo;t have any teams. Add one!</h2>
        <TeamAddForm onSubmit={onSubmit(addTeam)} />
      </PageLayout>
    );
  }
};

TeamView.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  currentTeam: PropTypes.object,
  addTeam: PropTypes.func.isRequired
};

export default TeamView;
