/*eslint-disable no-unused-vars*/
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import TeamView from '../components/TeamView';

import CURRENT_USER_QUERY from '../../user/graphql/CurrentUserQuery.graphql';

class Team extends React.Component {
  render() {
    console.log(this.props);
    return <TeamView {...this.props} />;
  }
}

Team.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object
};

const TeamWithApollo = compose()(Team);

export default compose(
  graphql(CURRENT_USER_QUERY, {
    options: { fetchPolicy: 'network-only' },
    props({ data: { loading, currentUser } }) {
      return { loading, currentUser };
    }
  })
)(Team);
