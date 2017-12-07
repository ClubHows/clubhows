import Todo from './mongodb';
import schema from './schema.graphqls';
import createResolvers from './resolvers';
import Feature from '../connector';

export default new Feature({
  schema,
  createResolversFunc: createResolvers,
  createContextFunc: () => {
    const todo = new Todo();

    return {
      Todo: todo
    };
  }
});
