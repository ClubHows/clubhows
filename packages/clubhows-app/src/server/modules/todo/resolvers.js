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
    }
  },
  Mutation: {
    createTodoList(_, args, context) {
      const { name, owner, isPrivate } = args.input;
      return context.Todo.createTodoList({ name: name, owner: context.user.id, isPrivate: isPrivate });
    },
    addTodoItem(_, args, context) {
      const { slug, name, owner } = args.input;
      return context.Team.addTeam({
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
