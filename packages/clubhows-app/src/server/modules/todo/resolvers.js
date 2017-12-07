/*eslint-disable no-unused-vars*/
import mongoose from 'mongoose';
import Todo from './mongodb';
import log from '../../../common/log';

export default pubsub => ({
  Query: {
    getTodoList(obj, { _id }, context) {
      return context.Todo.getTodoList(_id);
    },
    getListBySlug(obj, { slug }, context) {
      return context.Todo.getListBySlug(slug);
    },
    getTodosByList(obj, { listId }, context) {
      return context.Todo.getTodosByList(listId);
    },
    async todos(obj, { orderBy, filter }, context) {
      return await context.Todo.todos({ orderBy, filter });
    },
    async lists(obj, { limit, after }, context) {
      let edgesArray = [];
      let lists = await context.Todo.listsPagination(context.user._id, limit, after);
      log('todo reso 23: ', lists);
      lists.map(list => {
        edgesArray.push({
          cursor: list.updatedAt,
          node: {
            _id: list._id,
            name: list.name,
            slug: list.slug,
            isPrivate: list.isPrivate,
            updatedAt: list.updatedAt
          }
        });
      });

      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
      log('todo reso 38: ', endCursor);

      const values = await Promise.all([context.Todo.getTotal(), context.Todo.getNextPageFlag(endCursor)]);
      await log('todo reso 41: ', values);
      return {
        totalCount: values[0],
        edges: edgesArray,
        pageInfo: {
          endCursor: endCursor,
          hasNextPage: values[1] > 0
        }
      };
    }
  },
  Mutation: {
    createTodoList(_, args, context) {
      const { name, owner, isPrivate } = args.input;
      return context.Todo.createTodoList({ name: name, owner: context.user._id, isPrivate: isPrivate });
    },
    addTodoItem(_, args, context) {
      const { slug, name, owner } = args.input;
      return context.Todo.addTodoItem({
        slug: args.slug,
        name: args.name,
        addr1: args.addr1,
        addr2: args.addr2,
        city: args.city,
        state: args.state,
        zip: args.zip,
        country: args.country,
        phone: args.phone
      });
    },
    removeTodoList(_, { listId }, context) {
      return context.Todo.removeTodoList({ _id: listId });
    },
    removeTodoItem(_, { todoId }, context) {
      return context.Todo.removeTodoItem({ _id: todoId });
    }
  },
  Subscription: {}
});
