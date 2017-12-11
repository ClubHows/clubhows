/*eslint-disable no-unused-vars*/
import React from 'react';
import { graphql, compose } from 'react-apollo';

import LandingView from '../components/LandingView';

class Landing extends React.Component {
  render() {
    return <LandingView {...this.props} />;
  }
}

const LandingWithApollo = compose()(Landing);

export default LandingWithApollo;
