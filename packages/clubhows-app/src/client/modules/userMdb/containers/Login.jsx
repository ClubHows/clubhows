/* eslint-disable no-undef */
// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Apollo
import { graphql, compose } from 'react-apollo';

// Components
import LoginView from '../components/LoginView';

import LOGIN from '../graphql/Login.graphql';

class Login extends React.Component {
  render() {
    console.log('Register Container:', this.state);
    return <LoginView {...this.props} />;
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  data: PropTypes.object
};

const LoginWithApollo = compose(
  graphql(LOGIN, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      login: async ({ email, password }) => {
        try {
          const { data: { login } } = await mutate({
            variables: { input: { email, password } }
          });

          if (login.errors) {
            return { errors: login.errors };
          }

          const { token, refreshToken } = login.tokens;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);

          if (history) {
            return history.push('/profile');
          }
          if (navigation) {
            return navigation.goBack();
          }
        } catch (e) {
          console.log(e.graphQLErrors);
        }
      }
    })
  })
)(Login);

export default connect(state => ({
  userNotification: state.user.userNotification
}))(LoginWithApollo);
