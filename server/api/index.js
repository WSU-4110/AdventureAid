
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Mrrobot22:9Hm0Dyuf3j8WDaJL@webusers.n7nabj9.mongodb.net/?retryWrites=true&w=majority";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

exports.runDB = async function () {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("UserProfiles");
    const collection = db.collection("UserProfiles");

    const documents = await collection.find({ name: "John Smith" }).toArray();
    
    console.log(documents);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//runDB().catch(console.dir);
