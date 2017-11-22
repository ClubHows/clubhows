import React, { Component } from 'react';
import Theme from '../theme';
import StyledForm from './StyledForm';

class Form extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <StyledForm
        theme={Theme}
        ref={ref => {
          this.componentRef = ref;
        }}
        {...rest}
      />
    );
  }
}

export default Form;
