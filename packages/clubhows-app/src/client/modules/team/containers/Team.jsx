/*eslint-disable no-unused-vars*/
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';

import TeamView from '../components/TeamView';

import CURRENT_TEAM from '../graphql/TeamQuery.graphql';
import ADD_TEAM from '../graphql/AddTeam.graphql';

export function AddTeam(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.teams.edges.some(team => node.id === team.cursor)) {
    return prev;
  }

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'TeamEdges'
  };

  return update(prev, {
    teams: {
      totalCount: {
        $set: prev.teams.totalCount + 1
      },
      edges: {
        $unshift: [edge]
      }
    }
  });
}

class Team extends React.Component {
  render() {
    console.log(this.props);
    return <TeamView {...this.props} />;
  }
}

Team.propTypes = {
  loading: PropTypes.bool.isRequired,
  team: PropTypes.object,
  currentTeam: PropTypes.object,
  addTeam: PropTypes.func.isRequired
};

const TeamWithApollo = compose()(Team);

export default compose(
  graphql(CURRENT_TEAM, {
    options: { fetchPolicy: 'network-only' },
    props({ data: { loading, currentTeam }, ...data }) {
      return { loading, currentTeam, ...data };
    }
  }),
  graphql(ADD_TEAM, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addTeam: async name => {
        let teamData = await mutate({
          variables: { input: { name } },
          optimisticResponse: {
            __typename: 'Mutation',
            addTeam: {
              __typename: 'Team',
              _id: null,
              name: name,
              owner: 'new',
              slug: null,
              members: [],
              locations: []
            }
          },
          updateQueries: {
            teams: (prev, { mutationResult: { data: { addTeam } } }) => {
              return AddTeam(prev, addTeam);
            }
          }
        });
      }
    })
  })
)(Team);
