/*eslint-disable no-unused-vars*/
import mongoose from 'mongoose';
import slugify from 'slugify';

import mongodb from '../../../server/mongodb';

import ListSchema from './Todo';
import log from '../../../common/log';

mongodb();

export default class Todo {
  getTodoList(_id) {
    return ListSchema.getListById(_id);
  }

  getListBySlug(slug) {
    return ListSchema.getListBySlug(slug);
  }

  getTodosByList(listId) {
    return ListSchema.getListTodos(listId);
  }

  async todos(orderby, sortby) {
    return await ListSchema.todos()
      .sort(sortby)
      .exec((err, results) => {
        if (!err) {
          results.filter(sortby => {
            return results.sortby;
          });
        }
      });
  }

  async todosPagination(limit, after) {
    return await ListSchema.find()
      .select('item')
      .limit(limit)
      .skip(after)
      .sort({ updatedAt: 'desc' });
  }

  createTodoList({ name, owner, isPrivate }) {
    log(name, owner, isPrivate);
    const slug = slugify(name, { lower: true });
    return ListSchema.create({
      name: name,
      owner: owner,
      slug: slug,
      isPrivate: isPrivate
    });
  }

  editList({ _id, name, isPrivate }) {
    const slug = slugify(name, { lower: true });
    return ListSchema.save(_id, { name: name, isPrivate: isPrivate });
  }

  addTodoItem({ item, listId, isPrivate }) {
    log(item, listId, isPrivate);
    return ListSchema.create({
      items: {
        item: item,
        list: listId,
        isPrivate: isPrivate
      }
    });
  }

  editItem({ _id, name, author, listId, isPrivate }) {
    const slug = slugify(name, { lower: true });
    return ListSchema.save(_id, { name: name, author: author, listId: listId, isPrivate: isPrivate });
  }

  async removeTodoList(listId) {
    return ListSchema.statics.removeListbyId(listId);
  }

  async removeTodoItem(todoId) {
    return ListSchema.statics.removeTodobyId(todoId);
  }

  async countLists(ownerId) {
    return ListSchema.statics.getListByOwner(ownerId).then(lists => lists.length);
  }

  async countTodos(listId) {
    return ListSchema.statics.getTodosByList(listId).then(todos => todos.length);
  }
}
