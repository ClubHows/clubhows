// Web only component

// React
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { SubmissionError } from 'redux-form';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import { Row, Col, PageLayout } from '../../common/components/web';
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
        <Box>
          <Row>
            <Col xs={{ size: 6, offset: 3 }}>
              <Row>
                <Col>
                  <h1 className="text-center">Log In</h1>
                  <LoginForm onSubmit={this.onSubmit(login)} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Box>
                    <Heading>Available logins:</Heading>
                    <Paragraph>
                      admin@example.com:admin<br />user@example.com:user
                    </Paragraph>
                  </Box>
                </Col>
              </Row>
            </Col>
          </Row>
        </Box>
      </PageLayout>
    );
  }
}

LoginView.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default LoginView;
