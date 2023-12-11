const mongoose = require('mongoose'); // needs to import this for testing
require('dotenv').config();

(async () => {
    try {
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  // console .log will help in testing and debugging
      console.log(
        `ENV : Mongodb connection successfully created.`
      );
    
      mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
      });
  
      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from database');
      });
  
      // close connections when the process is stopped
      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          console.log(
            'Mongoose connection closed due to application termination'
          );
        });
      });
    } catch (err) {
      console.error('Mongodb connection error:', err);
    }
  })();