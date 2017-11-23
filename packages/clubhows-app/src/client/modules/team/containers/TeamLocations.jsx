import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';
import { reset } from 'redux-form';

import TeamLocationsView from '../components/TeamLocationsView';

import ADD_LOCATION from '../graphql/AddLocation.graphql';

function AddLocation(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.post.comments.some(comment => node.id === comment.id)) {
    return prev;
  }

  return update(prev, {
    post: {
      comments: {
        $push: [node]
      }
    }
  });
}

class TeamLocations extends React.Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    // Check if props have changed and, if necessary, stop the subscription
    if (this.subscription && this.props.postId !== nextProps.postId) {
      this.subscription = null;
    }

    // Subscribe or re-subscribe
    if (!this.subscription) {
      this.subscribeToCommentList(nextProps.postId);
    }
  }

  componentWillUnmount() {
    this.props.onCommentSelect({ id: null, content: '' });

    if (this.subscription) {
      // unsubscribe
      this.subscription();
    }
  }

  render() {
    return <TeamLocationsView {...this.props} />;
  }
}

TeamLocations.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  comment: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  onCommentSelect: PropTypes.func.isRequired,
  onFormSubmitted: PropTypes.func.isRequired
};

const TeamLocationsWithApollo = compose(
  graphql(ADD_LOCATION, {
    props: ({ mutate }) => ({
      addComment: (content, postId) =>
        mutate({
          variables: { input: { content, postId } },
          optimisticResponse: {
            __typename: 'Mutation',
            addComment: {
              __typename: 'Comment',
              id: null,
              content: content
            }
          },
          updateQueries: {
            post: (prev, { mutationResult: { data: { addComment } } }) => {
              if (prev.post) {
                return AddLocation(prev, addComment);
              }
            }
          }
        })
    })
  })
)(TeamLocations);

export default connect(
  state => ({ comment: state.post.comment }),
  dispatch => ({
    onCommentSelect(comment) {
      dispatch({
        type: 'COMMENT_SELECT',
        value: comment
      });
    },
    onFormSubmitted() {
      dispatch(reset('comment'));
    }
  })
)(TeamLocationsWithApollo);
