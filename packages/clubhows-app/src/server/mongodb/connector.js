import mongoose from 'mongoose';
import bluebird from 'bluebird';
import log from '../../common/log';

export default async function run() {
  mongoose.Promise = bluebird;

  const dbURI = process.env.MONGO_DB;

  mongoose.connect(dbURI, {
    useMongoClient: true
  });

  await mongoose.connection.on('connected', () => {
    log('Mongoose default connection open to ' + dbURI);
  });

  // If the connection throws an error
  await mongoose.connection.on('error', err => {
    log('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  await mongoose.connection.on('disconnected', () => {
    log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
}
