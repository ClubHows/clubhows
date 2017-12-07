import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';

import TodoList from '../components/TodoList';

import LISTS_QUERY from '../graphql/ListsQuery.graphql';
import CREATE_LIST from '../graphql/CreateList.graphql';
import REMOVE_LIST from '../graphql/RemoveList.graphql';

export function CreateList(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.lists.edges.some(list => node.id === list.cursor)) {
    return prev;
  }

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'TodoEdges'
  };

  return update(prev, {
    lists: {
      totalCount: {
        $set: prev.lists.totalCount + 1
      },
      edges: {
        $unshift: [edge]
      }
    }
  });
}

function RemoveList(prev, id) {
  const index = prev.lists.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    lists: {
      totalCount: {
        $set: prev.lists.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}

class Todo extends React.Component {
  render() {
    return <TodoList {...this.props} />;
  }
}

Todo.propTypes = {
  loading: PropTypes.bool.isRequired,
  lists: PropTypes.object,
  createTodoList: PropTypes.func.isRequired,
  removeTodoList: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
  onAddList: PropTypes.func.isRequired
};

const TodoWithApollo = compose(
  graphql(LISTS_QUERY, {
    options: () => {
      return {
        variables: { limit: 10, after: 0 }
      };
    },
    props: ({ data }) => {
      const { loading, lists, fetchMore } = data;
      const loadMoreRows = () => {
        return fetchMore({
          variables: {
            after: lists.pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.lists.totalCount;
            const newEdges = fetchMoreResult.lists.edges;
            const pageInfo = fetchMoreResult.lists.pageInfo;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              lists: {
                totalCount,
                edges: [...previousResult.lists.edges, ...newEdges],
                pageInfo,
                __typename: 'Lists'
              }
            };
          }
        });
      };

      return { loading, lists, loadMoreRows };
    }
  }),
  graphql(REMOVE_LIST, {
    props: ({ mutate }) => ({
      removeTodoList: listId => {
        mutate({
          variables: { listId },
          optimisticResponse: {
            __typename: 'Mutation',
            removeTodoList: {
              listId: listId,
              __typename: 'List'
            }
          },
          updateQueries: {
            lists: (prev, { mutationResult: { data: { removeTodoList } } }) => {
              return RemoveList(prev, removeTodoList.listId);
            }
          }
        });
      }
    })
  }),
  graphql(CREATE_LIST, {
    props: ({ mutate }) => ({
      createTodoList: input => {
        mutate({
          variables: { input },
          optimisticResponse: {
            __typename: 'Mutation',
            createTodoList: {
              input,
              __typename: 'List'
            }
          },
          updateQueries: {
            lists: (prev, { mutationResult: { data: { createTodoList } } }) => {
              return CreateList(prev, createTodoList.input);
            }
          }
        });
      }
    })
  })
)(Todo);

export default connect(
  state => ({ addListForm: state.todo.addListForm }),
  dispatch => ({
    onAddList() {
      return () =>
        dispatch({
          type: 'TOGGLE_ADDLISTFORM',
          value: true
        });
    }
  })
)(TodoWithApollo);
