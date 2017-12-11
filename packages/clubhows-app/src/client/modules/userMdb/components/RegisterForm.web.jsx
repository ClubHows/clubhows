import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import url from 'url';
import { styled } from 'styled-components';
import { Form, RenderField, Button, Alert, Row, Col } from '../../common/components/web';

import settings from '../../../../../settings';

const { protocol, hostname, port } = url.parse(__BACKEND_URL__);
let serverPort = process.env.PORT || port;
if (__DEV__) {
  serverPort = '3000';
}

const required = value => (value ? undefined : 'Required');

const facebookLogin = () => {
  window.location = `${protocol}//${hostname}:${serverPort}/auth/facebook`;
};

const googleLogin = () => {
  window.location = `${protocol}//${hostname}:${serverPort}/auth/google`;
};

const OrText = styled.div`
  display: block;
  text-align: center;
  margin: 0 auto;

  > span {
    content: '';
    height: 1px;
    border-top: 1px solid #e8e8e8;
    position: relative;
    z-index: -1;
  }
`;

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength3 = minLength(3);
export const minLength5 = minLength(5);

const validate = values => {
  const errors = {};

  if (values.password && values.passwordConfirmation && values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  return errors;
};

const RegisterForm = ({ handleSubmit, submitting, onSubmit, error }) => {
  return (
    <Form name="register" onSubmit={handleSubmit(onSubmit)}>
      {settings.user.auth.facebook.enabled || settings.user.auth.google.enabled ? <h3>Register with:</h3> : null}
      {settings.user.auth.facebook.enabled && (
        <Button color="primary" type="button" onClick={facebookLogin} style={{ margin: 10 }}>
          Login with Facebook
        </Button>
      )}
      {settings.user.auth.google.enabled && (
        <Button color="primary" type="button" onClick={googleLogin} style={{ margin: 10 }}>
          Login with Google
        </Button>
      )}
      {settings.user.auth.facebook.enabled || settings.user.auth.google.enabled ? <OrText>or</OrText> : null}
      <Field name="username" component={RenderField} type="text" label="Username" validate={[required, minLength3]} />
      <Field name="email" component={RenderField} type="email" label="Email" validate={required} />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label="Password"
        validate={[required, minLength5]}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label="Password Confirmation"
        validate={[required, minLength5]}
      />
      <div>
        <Row>
          <Col xs={{ size: 6, offset: 3 }}>
            <div className="text-center">
              {error && <Alert color="error">{error}</Alert>}
              <Button color="primary" type="submit" disabled={submitting}>
                Register
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.string
};

export default reduxForm({
  form: 'register',
  validate
})(RegisterForm);
