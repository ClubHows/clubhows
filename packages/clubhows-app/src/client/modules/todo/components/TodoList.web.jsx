import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '@atlaskit/button';
import { PageLayout, Table } from '../../common/components/web';

import log from '../../../../common/log';

class TodoList extends React.PureComponent {
  hendleCreateList = input => {
    const { createTodoList } = this.props;
    createTodoList(input);
  };

  hendleRemoveList = id => {
    const { removeTodoList } = this.props;
    removeTodoList(id);
  };

  renderLoadMore = (lists, loadMoreRows) => {
    if (lists.pageInfo.hasNextPage) {
      return (
        <Button id="load-more" color="primary" onClick={loadMoreRows}>
          Load more ...
        </Button>
      );
    }
  };

  renderMetaData = () => (
    <Helmet
      title={`Lists`}
      meta={[
        {
          name: 'description',
          content: `All lists`
        }
      ]}
    />
  );

  render() {
    const { loading, lists, loadMoreRows, onAddList } = this.props;
    log('TodoList 44: ', lists);
    if (loading) {
      return (
        <PageLayout>
          {this.renderMetaData()}
          <div className="text-center">Loading...</div>
        </PageLayout>
      );
    } else {
      const columns = [
        {
          title: 'List',
          dataIndex: 'title',
          key: 'title',
          render: (text, record) => (
            <Link className="list-link" to={`/list/${record.slug}`}>
              {record.name}
            </Link>
          )
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 50,
          render: (text, record) => (
            <Button
              color="primary"
              size="sm"
              className="delete-button"
              onClick={() => this.hendleRemoveList(record._id)}
            >
              Delete
            </Button>
          )
        }
      ];
      return (
        <PageLayout>
          {this.renderMetaData()}
          <h2>Lists</h2>
          <Link to="/list/add">
            <Button color="primary" onClick={onAddList()}>
              Add
            </Button>
          </Link>
          <h1 />
          <Table dataSource={lists.edges.map(({ node }) => node)} columns={columns} />
          <div>
            <small>
              ({lists.edges.length} / {lists.totalCount})
            </small>
          </div>
          {this.renderLoadMore(lists, loadMoreRows)}
        </PageLayout>
      );
    }
  }
}

TodoList.propTypes = {
  loading: PropTypes.bool.isRequired,
  lists: PropTypes.object,
  createTodoList: PropTypes.func.isRequired,
  removeTodoList: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
  onAddList: PropTypes.func.isRequired
};

export default TodoList;
