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

const contactForm = css`
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

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitError: '',
      emailError: '',
      nameError: '',
      messageError: '',
      success: '',
      name: '',
      email: '',
      message: ''
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleMessChange = e => {
    this.setState({ message: e.target.value });
  };

  processEmail(e) {
    e.preventDefault();
    // eslint-disable-next-line
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    console.log(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
    if (name === '') {
      return this.setState({ nameError: 'Please enter a name.' });
    }

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

    if (message === '') {
      return this.setState({
        messageError: 'Please ask a question or tell us something!'
      });
    }

    const contact = { name, email, message, e };

    return this.SendEmail(contact);
  }

  SendEmail = contact => {
    console.log(contact);

    fetch('http://localhost:7001/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        message: contact.message
      })
    })
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          this.setState({
            success: 'Yay! Note sent, we will be in touch shortly!',
            nameError: '',
            emailError: '',
            messageError: '',
            name: '',
            email: '',
            message: ''
          });
        }
        return result;
      })
      .catch(err => {
        console.log(err);
        this.setState({
          submitError: `Email send error: ${err}`,
          nameError: '',
          emailError: '',
          messageError: '',
          name: '',
          email: '',
          message: ''
        });
      });
  };

  render() {
    const {
      submitError,
      success,
      nameError,
      messageError,
      emailError
    } = this.state;
    console.log(this.state);
    return (
      <Box pad="medium" direction="column" className={contactForm}>
        <Form onSubmit={e => this.processEmail(e)}>
          <Box pad="none" margin="none">
            <Heading tag="h2">Ask &amp; Tell</Heading>
            <Paragraph size="small" margin="small">
              We eagerly await whatever message you might send our way!
            </Paragraph>
          </Box>

          {submitError !== '' && (
            <Notification size="small" message={submitError} status="warning" />
          )}
          {success !== '' && (
            <Notification size="small" message={success} status="ok" />
          )}

          <FormField label="Your name" error={nameError}>
            <TextInput
              placeHolder="Hi, what's your name?"
              name="name"
              id="name"
              defaultValue={this.state.name}
              onChange={this.handleNameChange}
            />
          </FormField>

          <FormField label="Your email" error={emailError}>
            <TextInput
              placeHolder="email@address.com"
              name="email"
              id="email"
              defaultValue={this.state.email}
              onChange={this.handleEmailChange}
            />
          </FormField>

          <FormField label="Message:" htmlFor="message" error={messageError}>
            <textarea
              rows="4"
              type="text"
              id="message"
              name="message"
              defaultValue={this.state.message}
              onChange={this.handleMessChange}
            />
          </FormField>
          {success === '' && (
            <Box pad={{ vertical: 'medium' }}>
              <Button
                box
                primary
                label="Send"
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
