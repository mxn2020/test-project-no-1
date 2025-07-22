import { MongoClient } from 'mongodb';

async function fixUserSchema() {
  console.log('====== FIXING USER SCHEMA ======');
  
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/geenius-template');
  await client.connect();
  const db = client.db();
  
  // The issue is likely that Better Auth expects string IDs everywhere
  // Let's check what the actual field types are
  
  const testUser = await db.collection('user').findOne({ email: 'test@test.com' });
  const testAccount = await db.collection('account').findOne({ userId: testUser._id });
  
  console.log('Current user record:');
  console.log('- _id type:', typeof testUser._id, testUser._id);
  console.log('- _id is ObjectId?', testUser._id.constructor.name === 'ObjectId');
  
  console.log('Current account record:');
  console.log('- userId type:', typeof testAccount.userId, testAccount.userId);
  console.log('- userId is ObjectId?', testAccount.userId.constructor.name === 'ObjectId');
  console.log('- accountId type:', typeof testAccount.accountId, testAccount.accountId);
  
  // Better Auth's MongoDB adapter expects all IDs to be strings
  // Let's create a properly structured user with string IDs
  
  const stringUserId = testUser._id.toString();
  
  console.log('====== CREATING PROPER USER RECORD ======');
  
  // First, let's delete the existing records
  await db.collection('user').deleteOne({ email: 'test@test.com' });
  await db.collection('account').deleteOne({ userId: testUser._id });
  
  // Create user with string ID
  const newUser = {
    id: stringUserId,
    email: 'test@test.com',
    name: 'Test User',
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  await db.collection('user').insertOne(newUser);
  console.log('Created user:', newUser);
  
  // Create account with string IDs
  const newAccount = {
    id: stringUserId + '_account',
    accountId: 'test@test.com', // This should be the email for credential provider
    providerId: 'credential',
    userId: stringUserId,
    password: testAccount.password, // Keep the same password hash
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  await db.collection('account').insertOne(newAccount);
  console.log('Created account:', newAccount);
  
  // Verify the new structure
  const verifyUser = await db.collection('user').findOne({ email: 'test@test.com' });
  const verifyAccount = await db.collection('account').findOne({ userId: stringUserId });
  
  console.log('====== VERIFICATION ======');
  console.log('New user:', verifyUser);
  console.log('New account:', verifyAccount);
  
  await client.close();
  
  console.log('====== SCHEMA FIX COMPLETE ======');
  console.log('The user schema has been updated to use string IDs as expected by Better Auth.');
}

fixUserSchema().catch(console.error);