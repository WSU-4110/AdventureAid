const express = require('express');
const { ObjectId } = require('mongodb'); // Added for handling MongoDB unique IDs
const app = express();
const port = process.env.PORT || 3000;  // Use port 3000, or set the PORT environment variable
const dbOperations = require('./api/mongoDB.js');

// Middleware
app.use(express.json()); 

// CRUD Routes for User Profiles

// Create a new user
app.post('/user', async (req, res) => {
  const user = req.body;
  try {
    const result = await mongo.collection.insertOne(user);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error inserting user', error });
  }
});

// Retrieve a user by ID
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await mongo.collection.findOne({ _id: new ObjectId(userId) });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user', error });
  }
});

// Update an existing user profile
app.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const result = await mongo.collection.updateOne({ _id: new ObjectId(userId) }, { $set: updatedData });
    if (result.modifiedCount === 1) {
      res.send({ message: 'User updated successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error updating user', error });
  }
});

// Remove a user profile
app.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await mongo.collection.deleteOne({ _id: new ObjectId(userId) });
    if (result.deletedCount === 1) {
      res.send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
  }
});

// Your initial test route
app.get('/', (req, res) => {
  res.send('Hello, Travel Planner!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  dbOperations.find("UserProfiles", {name: "Dan Pop"} );
});
