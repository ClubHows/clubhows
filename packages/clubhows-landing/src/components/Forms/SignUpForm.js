import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import { css } from 'emotion';

import colors from '../../utils/colors';

const signupForm = css`
  div & {
    & h2 {
      margin: 0;
    }
    ul & {
      li & {
        a & {
          color: ${colors.secondary};
          &:hover {
            color: ${colors.cyan2};
          }
        }
      }
    }
  }
`;

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitError: '',
      emailError: '',
      success: '',
      email: ''
    };
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  processEmail(e) {
    e.preventDefault();

    const email = e.target.email.value;

    if (email === '') {
      return this.setState({
        emailError: 'Please enter an email address'
      });
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return this.setState({
        emailError: 'Please enter a valid email address'
      });
    }

    const signup = { email };

    return this.SendEmail(signup);
  }

  SendEmail = signup => {
    // console.log(signup);

    fetch('https://api.clubhows.com/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signup.email
      })
    })
      .then(result => {
        // console.log(result);
        if (result.status === 200) {
          this.setState({
            success: 'Yay! We will be in touch soon!',
            emailError: '',
            email: ''
          });
        }
        return result;
      })
      .catch(err => {
        // console.log(err);
        this.setState({
          submitError: `Subscribe error: ${err}`,
          emailError: '',
          email: ''
        });
      });
  };

  render() {
    const { submitError, success, emailError } = this.state;
    // console.log(this.state);
    return (
      <Box pad="medium" direction="column" className={signupForm}>
        <Form onSubmit={e => this.processEmail(e)}>
          <Box pad="none" margin="none">
            <Heading tag="h2">Signup for our Open Beta</Heading>
            <Paragraph size="small" margin="small">
              We&apos;re busily building and need your help to make the
              collaboration between space and people better and easier.
            </Paragraph>
          </Box>

          {submitError !== '' && (
            <Notification size="small" message={submitError} status="warning" />
          )}
          {success !== '' && (
            <Notification size="small" message={success} status="ok" />
          )}

          <FormField label="Your email" error={emailError}>
            <TextInput
              placeHolder="email@address.com"
              name="email"
              id="email"
              defaultValue={this.state.email}
              onChange={this.handleEmailChange}
            />
          </FormField>

          {success === '' && (
            <Box pad={{ vertical: 'medium' }}>
              <Button
                box
                primary
                label="Sign me up!"
                type="submit"
                size="medium"
                alignSelf="start"
              />
            </Box>
          )}
        </Form>
      </Box>
    );
  }
}
