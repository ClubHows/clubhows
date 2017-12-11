/*eslint-disable no-unused-vars*/
import React from 'react';
import { graphql, compose } from 'react-apollo';

import DashboardView from '../components/DashboardView';

class Dashboard extends React.Component {
  render() {
    return <DashboardView {...this.props} />;
  }
}

const DashboardWithApollo = compose()(Dashboard);

export default DashboardWithApollo;
