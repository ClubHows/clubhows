import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { AddTeam } from './TeamAdd';

import ADD_TEAM from '../graphql/AddTeam.graphql';

class TeamAdd extends React.Component {
  constructor(props) {
    super(props);

    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && this.props.post.id !== nextProps.post.id) {
        this.subscription();
        this.subscription = null;
      }

      // Subscribe or re-subscribe
      if (!this.subscription && nextProps.post) {
        this.subscribeToPostEdit(nextProps.post.id);
      }
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      // unsubscribe
      this.subscription();
    }
  }

  render() {
    return <TeamAddView {...this.props} />;
  }
}

TeamAdd.propTypes = {
  loading: PropTypes.bool.isRequired,
  post: PropTypes.object,
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

export default compose(
  graphql(TEAM_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id }
      };
    },
    props({ data: { loading, post, subscribeToMore } }) {
      return { loading, post, subscribeToMore };
    }
  }),
  graphql(ADD_TEAM, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addPost: async (title, content) => {
        let postData = await mutate({
          variables: { input: { title, content } },
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              id: null,
              title: title,
              content: content,
              comments: []
            }
          },
          updateQueries: {
            posts: (prev, { mutationResult: { data: { addPost } } }) => {
              return AddPost(prev, addPost);
            }
          }
        });

        if (history) {
          return history.push('/post/' + postData.data.addPost.id, {
            post: postData.data.addPost
          });
        } else if (navigation) {
          return navigation.setParams({
            id: postData.data.addPost.id,
            post: postData.data.addPost
          });
        }
      }
    })
  }),
  graphql(EDIT_POST, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      editPost: async (id, title, content) => {
        await mutate({
          variables: { input: { id, title, content } }
        });

        if (history) {
          return history.push('/posts');
        }
        if (navigation) {
          return navigation.goBack();
        }
      }
    })
  })
)(PostEdit);
