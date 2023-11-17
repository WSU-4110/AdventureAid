const dbOperations = require('./path-to-your-dbOperations-file');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.DB_URI;

jest.mock('mongodb', () => {
    const actualMongoDB = jest.requireActual('mongodb');
    return {
      ...actualMongoDB,
      MongoClient: {
        ...actualMongoDB.MongoClient,
        connect: jest.fn().mockResolvedValue({
          db: jest.fn().mockResolvedValue({
            collection: jest.fn().mockReturnValue({
                find: jest.fn().mockResolvedValue(/* Mocked find result */),
                insertOne: jest.fn().mockResolvedValue(/* Mocked insert result */),
                updateOne: jest.fn().mockResolvedValue(/* Mocked update result */),
                deleteOne: jest.fn().mockResolvedValue(/* Mocked delete result */),
            })
          })
        })
      }
    }
});

describe('dbOperations', () => {
    describe('connect', () => {
      it('should connect to the database successfully', async () => {
        const db = await dbOperations.connect();
        expect(db).toBeDefined();
        // Optionally, you can add more assertions here to verify the mock methods
        // For example:
        expect(db.collection).toBeDefined();
        expect(db.collection().find).toBeDefined();
      });
  
      it('should handle connection errors', async () => {
        MongoClient.connect.mockRejectedValue(new Error('Connection failed'));
        await expect(dbOperations.connect()).rejects.toThrow('Connection failed');
      });
    });
  
    // More tests for other methods...
  });

