// Importing external dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
// Importing config options
dotenv.config({ path: './config.env' });
const app = require('./app');

// Connecting to DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// Starting Mongoose
mongoose.connect(DB).then(() => console.log('DB connection successful'));

// Port info
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app running on port ${port}`));

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
