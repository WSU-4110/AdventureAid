const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.DB_URI;

//singleton class for mongoClient
class MongoDBClient {
  constructor() {
    if (!MongoDBClient.instance) { //check if there is an existing instance of MongoDBClient
      this._client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
      });
      MongoDBClient.instance = this;
    }
    //ensuring that only one instance is returned every time a new MongoDBClient is instantiated
    return MongoDBClient.instance;
  }

  async getClient() {
      // ... existing connection logic for non-test environments ...
      try {
        await this._client.connect();
        console.log("Connected to MongoDB.");
      } catch (err) {
        if (err.message !== 'MongoClient is already connected') {
          throw err;
        }
        // If the error is because the client is already connected, just continue.
      }
      return this._client;
  }
}

const instance = new MongoDBClient();
Object.freeze(instance);

// object literal for custom database API's
const dbOperations = {
  connect: async function(input_database) {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      const client = await instance.getClient();
      return client.db(input_database);
    } catch(error) {
      console.log(error);
      throw error;
    } 
  },
  login: async function(username, password) {
    try {
      const db = await dbOperations.connect();
      const collection = db.collection("UserProfiles");
      const user = await collection.findOne({ name: username });
      if (!user) {
        console.log("User not found");
        return false;
      }
      const isMatch = await compare(password, user.password);
      return isMatch;
    } catch(error) {
      console.log(error);
      throw error;
    }
  },
  find: async function(input_database, input_collection, input_document) {
    try {
      const db = await dbOperations.connect(input_database);
      const collection = db.collection(input_collection);
      // find document in collection
      const documents = await collection.find(input_document).toArray();
      console.log(documents);
      return documents;
    } catch(error) {
      console.log(error);
      throw error;
    }
  },
  insert: async function(input_database, input_collection, input_document) {
    try {
      const db = await dbOperations.connect(input_database);
      var collection = db.collection(input_collection);
      // insert document into db
      const insert_result = await collection.insertOne(input_document)
      console.log(`Document inserted with _id: ${insert_result.insertedId}`);
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  },
  update: async function(input_database, input_collection, input_query, input_update) {
    try {
      const db = await dbOperations.connect(input_database);
      var collection = db.collection(input_collection);

      // update document in db
      const update_result = await collection.updateOne(input_query, input_update)
      console.log(`${update_result.modifiedCount} document(s) was/were updated.`);

      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  },
  delete: async function(input_database, input_collection, input_document) {
    try {
      const db = await dbOperations.connect(input_database);
      var collection = db.collection(input_collection);
      // delete document from collection
      const delete_result = await collection.deleteOne(input_document)
      console.log(`${delete_result.deletedCount} document(s) deleted.`);
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  },
  deleteAll: async function(input_database, input_collection) {
    try {
      const db = await dbOperations.connect(input_database);
      var collection = db.collection(input_collection);
      
      // delete all documents from the collection
      const delete_result = await collection.deleteMany({}); // passing an empty object will match all documents
      
      console.log(`${delete_result.deletedCount} document(s) deleted.`);
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }
};
//dbOperations.insert("UserProfiles", {name: "cricket16", email:"cricket16@gmail.com", password:"cricket16"})

/*
Example function calls:
dbOperations.find("UserProfiles", {name: "Jane Roberts"} );
dbOperations.insert("UserProfiles", {name: "Harry Potter", email:"harrypottter@gmail.com", password:"magic123"})
dbOperations.update("UserProfiles", {name: "Harry Potter"}, {$set:{name: "Tom Riddle"}})
dbOperations.delete("UserProfiles", {name: "Harry Potter"})
*/
//dbOperations.connect();

module.exports = dbOperations;