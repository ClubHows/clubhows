import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, RenderField, Button } from '../../common/components/web';

const required = value => (value ? undefined : 'Required');

const TeamAddForm = ({ handleSubmit, submitting, onSubmit }) => {
  return (
    <Form name="teamAdd" onSubmit={handleSubmit(onSubmit)}>
      <Field name="name" component={RenderField} type="text" label="Team Name" validate={required} />
      <Button color="primary" type="submit" disabled={submitting}>
        Add Team
      </Button>
    </Form>
  );
};

TeamAddForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'teamAdd',
  enableReinitialize: true
})(TeamAddForm);
