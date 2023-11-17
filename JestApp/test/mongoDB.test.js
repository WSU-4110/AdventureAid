const dbOperations = require('../src/mongoDB')
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.DB_URI;

let mongoServer;
let mockClient;

describe('dbOperations', () => {
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();

    mockClient = new MongoClient(uri);
    await mockClient.connect();

    const db = mockClient.db("TestDatabase")
    const UserProfiles = db.collection("UserProfilesCollection")
    await UserProfiles.insertMany([
      { email: "alice@example.com", password: "password123" },
      { email: "bob@example.com", password: "password456" },
      { email: "dave@example.com", password: "password789" }
    ])
  });

  afterAll(async () => {
    if (mockClient) {
      await mockClient.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  test('connect function should connect to the database', async () => {
    const db = await dbOperations.connect("TestDatabase");
    expect(db).toBeDefined();
    expect(db.databaseName).toBe("TestDatabase");
  });
  test('find operation should return a user by email', async () => {
    const documents = await dbOperations.find("TestDatabase", "UserProfilesCollection", { email: "alice@example.com" });
    // Check that the result is not empty and contains the expected user
    expect(documents).toBeDefined();
    expect(documents[0].email).toBe("alice@example.com");
  });
  test('insert function should insert a document into a collection', async () => {
    const isInserted = await dbOperations.insert("TestDatabase", "UserProfilesCollection", { email: "paul@example.com", password: "passwordabc" });
    expect(isInserted).toBeDefined();
    expect(isInserted).toBe(true);
  });
  test('update function should update a document in a collection', async () => {
    const isUpdated = await dbOperations.update("TestDatabase", "UserProfilesCollection", {email: "paul@example.com"}, {$set:{email: "peter@example.com"}});
    expect(isUpdated).toBeDefined();
    expect(isUpdated).toBe(true);
  });
  test('delete function should delete a document from a collection', async () => {
    const isDeleted = await dbOperations.delete("TestDatabase", "UserProfilesCollection", { email: "bob@example.com" });
    expect(isDeleted).toBeDefined();
    expect(isDeleted).toBe(true);
  });
  test('deleteAll function should delete all documents from a collection', async () => {
    const isAllDeleted = await dbOperations.deleteAll("TestDatabase", "UserProfilesCollection");
    expect(isAllDeleted).toBeDefined();
    expect(isAllDeleted).toBe(true);
  });
});