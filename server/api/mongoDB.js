const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
console.log(process.env.DB_URI);
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// object literal for custom database API's
const dbOperations = {
  connect: async function() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      return true;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  },
  find: async function(input_collection, input_document) {
    try {
      await client.connect();
      
      const db = client.db("AdventureAid");
      var collection = db.collection(input_collection);

      // find document in collection
      const documents = await collection.find(input_document).toArray();
      console.log(documents);

      return documents;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      await client.close();
    }
  },
  insert: async function(input_collection, input_document) {
    try {
      await client.connect();

      const db = client.db("AdventureAid");
      var collection = db.collection(input_collection);

      // insert document into db
      const insert_result = await collection.insertOne(input_document)
      console.log(`Document inserted with _id: ${insert_result.insertedId}`);

      return true;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      await client.close();
    }
  },
  update: async function(input_collection, input_query, input_update) {
    try {
      await client.connect();

      const db = client.db("AdventureAid");
      var collection = db.collection(input_collection);

      // update document in db
      const update_result = await collection.updateOne(input_query, input_update)
      console.log(`${update_result.modifiedCount} document(s) was/were updated.`);

      return true;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      await client.close();
    }
  },
  delete: async function(input_collection, input_document) {
    try {
      await client.connect();

      const db = client.db("AdventureAid");
      var collection = db.collection(input_collection);

      // delete document from collection
      const delete_result = await collection.deleteOne(input_document)
      console.log(`${delete_result.deletedCount} document(s) deleted.`);

      return true;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      await client.close();
    }
  }
};

/*
Example function calls:
dbOperations.find("UserProfiles", {name: "Jane Roberts"} );
dbOperations.insert("UserProfiles", {name: "Harry Potter", email:"harrypottter@gmail.com", password:"magic123"})
dbOperations.update("UserProfiles", {name: "Harry Potter"}, {$set:{name: "Tom Riddle"}})
dbOperations.delete("UserProfiles", {name: "Harry Potter"})
*/

module.exports = dbOperations;