// Web only component

// React
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { SubmissionError } from 'redux-form';
import { PageLayout, Row, Col } from '../../common/components/web';
import RegisterForm from '../components/RegisterForm';

class RegisterView extends React.PureComponent {
  onSubmit = async values => {
    const { register, onRegister } = this.props;
    const result = await register(values);
    console.log('Register:', result);
    if (result.errors) {
      let submitError = {
        _error: 'Registration failed!'
      };
      result.errors.map(error => (submitError[error.field] = error.message));
      throw new SubmissionError(submitError);
    } else {
      onRegister();
    }
  };

  renderMetaData = () => (
    <Helmet
      title="Register"
      meta={[
        {
          name: 'description',
          content: 'Register page'
        }
      ]}
    />
  );

  render() {
    return (
      <PageLayout>
        {this.renderMetaData()}
        <div>
          <Row>
            <Col xs={{ size: 6, offset: 3 }}>
              <Row>
                <Col>
                  <h1 className="text-center">Sign Up</h1>
                  <RegisterForm onSubmit={this.onSubmit} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}

RegisterView.propTypes = {
  register: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired
};

export default RegisterView;
