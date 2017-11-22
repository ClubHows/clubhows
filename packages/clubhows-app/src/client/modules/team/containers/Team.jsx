/*eslint-disable no-unused-vars*/
import React from 'react';
import { graphql, compose } from 'react-apollo';

import TeamView from '../components/TeamView';

class Team extends React.Component {
  render() {
    return <TeamView {...this.props} />;
  }
}

const TeamWithApollo = compose()(Team);

export default TeamWithApollo;
