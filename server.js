// Importing external dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Importing config options
dotenv.config({ path: './config.env' });
const app = require('./app');


// Connecting to DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// Starting Mongoose
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful'));


// Port info
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app running on port ${port}`));
