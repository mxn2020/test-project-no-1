import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testMongoConnection() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/geenius-template';
  const client = new MongoClient(uri);

  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');

    const db = client.db();
    console.log('📊 Database name:', db.databaseName);

    // Test database operations
    console.log('🔄 Testing database operations...');
    
    // Insert test document
    const collection = db.collection('test');
    const result = await collection.insertOne({ 
      test: 'connection',
      timestamp: new Date(),
      message: 'MongoDB connection test successful'
    });
    console.log('✅ Test document inserted with ID:', result.insertedId);

    // Read test document
    const document = await collection.findOne({ _id: result.insertedId });
    console.log('✅ Test document retrieved:', document.message);

    // Delete test document
    await collection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document deleted');

    // List existing collections
    const collections = await db.listCollections().toArray();
    console.log('📋 Existing collections:', collections.map(c => c.name));

    console.log('🎉 MongoDB connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting tips:');
    console.error('1. Make sure MongoDB is running locally');
    console.error('2. Check your MONGODB_URI in .env file');
    console.error('3. Verify the database name and connection string');
    console.error('4. For Docker: docker run -d --name mongodb -p 27017:27017 mongo');
    console.error('5. For macOS: brew services start mongodb-community');
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the test
testMongoConnection();