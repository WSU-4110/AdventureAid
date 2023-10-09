const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const {hash,compare} = require('./bcheck.js');

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db;
// object literal for custom database API's
const dbOperations = {
  connect: async function() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      db = client.db("AdventureAid");
      console.log("Connected to MongoDB!");
    } catch(error) {
      console.log(error);
      throw error;
    } 
    // finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
  },
  login: async function(username, password) {
    try {
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

    if (input_collection === "UserProfiles" && input_document.password) {
      input_document.password = await hash(input_document.password);
    }

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
dbOperations.insert("UserProfiles", {name: "cricket16", email:"cricket16@gmail.com", password:"cricket16"})

/*
Example function calls:
dbOperations.find("UserProfiles", {name: "Jane Roberts"} );
dbOperations.insert("UserProfiles", {name: "Harry Potter", email:"harrypottter@gmail.com", password:"magic123"})
dbOperations.update("UserProfiles", {name: "Harry Potter"}, {$set:{name: "Tom Riddle"}})
dbOperations.delete("UserProfiles", {name: "Harry Potter"})
*/
//dbOperations.connect();

module.exports = dbOperations;