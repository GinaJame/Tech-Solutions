const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.CONNECTIONSTRING;

mongoose.connect(MONGODB_URI);

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

beforeEach(() => {
  mongoose.connection.collections.users.drop(() => {});
  //mongoose.connection.collections.sprojects.drop(() => {});
  //mongoose.connection.collections.oprojects.drop(() => {});
});