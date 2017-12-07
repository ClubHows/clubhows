/*eslint-disable no-unused-vars*/
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import TeamView from '../components/TeamView';

import CURRENT_TEAM from '../graphql/TeamQuery.graphql';

class Team extends React.Component {
  render() {
    console.log(this.props);
    return <TeamView {...this.props} />;
  }
}

Team.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object
};

const TeamWithApollo = compose()(Team);

export default compose(
  graphql(CURRENT_TEAM, {
    options: { fetchPolicy: 'network-only' },
    props({ data: { loading, currentTeam } }) {
      return { loading, currentTeam };
    }
  })
)(Team);
