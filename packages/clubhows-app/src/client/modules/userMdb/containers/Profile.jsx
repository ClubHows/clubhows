/*eslint-disable no-unused-vars*/
// React
import React from 'react';
import PropTypes from 'prop-types';

// Apollo
import { graphql, compose } from 'react-apollo';

// Components
import ProfileView from '../components/ProfileView';

import CURRENT_USER_QUERY from '../graphql/CurrentUserQuery.graphql';

class Profile extends React.Component {
  render() {
    console.log(this.props);
    return <ProfileView {...this.props} />;
  }
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    options: { fetchPolicy: 'network-only' },
    props({ data: { loading, currentUser, error } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })
)(Profile);
