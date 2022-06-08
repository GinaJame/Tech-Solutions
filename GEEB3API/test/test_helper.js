const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { afterEach } = require('mocha');

dotenv.config();

mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.CONNECTIONSTRING;

mongoose.connect(MONGODB_URI);

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

afterEach(async function () {
  await mongoose.connection.collections.users.drop(() => {});
  await mongoose.connection.collections.oprojects.drop(() => {});
  await mongoose.connection.collections.sprojects.drop(() => {});
});
