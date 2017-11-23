import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, RenderField, Button } from '../../common/components/web';

const required = value => (value ? undefined : 'Required');

const TeamForm = ({ handleSubmit, submitting, onSubmit }) => {
  return (
    <Form name="post" onSubmit={handleSubmit(onSubmit)}>
      <Field name="name" component={RenderField} type="text" label="Team Name" validate={required} />
      <Field name="id" component={RenderField} type="text" label="Content" validate={required} />
      <Button color="primary" type="submit" disabled={submitting}>
        Save
      </Button>
    </Form>
  );
};

TeamForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'team',
  enableReinitialize: true
})(TeamForm);
