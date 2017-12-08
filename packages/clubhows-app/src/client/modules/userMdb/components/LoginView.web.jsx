// Web only component

// React
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { SubmissionError } from 'redux-form';
import { LayoutCenter } from '../../common/components';
import { PageLayout } from '../../common/components/web';
import LoginForm from '../components/LoginForm';

class LoginView extends React.PureComponent {
  onSubmit = login => async values => {
    const result = await login(values);

    if (result.errors) {
      let submitError = {
        _error: 'Login failed!'
      };
      result.errors.map(error => (submitError[error.field] = error.message));
      throw new SubmissionError(submitError);
    }
  };

  render() {
    const { login } = this.props;

    const renderMetaData = () => (
      <Helmet
        title="Login"
        meta={[
          {
            name: 'description',
            content: 'Login page'
          }
        ]}
      />
    );

    return (
      <PageLayout>
        {renderMetaData()}
        <LayoutCenter>
          <h1 className="text-center">Log In</h1>
          <LoginForm onSubmit={this.onSubmit(login)} />
          <hr />
        </LayoutCenter>
      </PageLayout>
    );
  }
}

LoginView.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default LoginView;
