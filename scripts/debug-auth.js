import { MongoClient } from 'mongodb';

async function debugAuth() {
  console.log('====== DEBUG AUTH SCRIPT ======');
  
  // Test direct database connection
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/geenius-template');
  await client.connect();
  const db = client.db();
  
  console.log('Database name:', db.databaseName);
  
  // Check collections
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  
  // Check user collection
  const users = await db.collection('user').find({}).toArray();
  console.log('All users:', JSON.stringify(users, null, 2));
  
  // Check account collection  
  const accounts = await db.collection('account').find({}).toArray();
  console.log('All accounts:', JSON.stringify(accounts, null, 2));
  
  // Check if the user and account are linked correctly
  const testUser = await db.collection('user').findOne({ email: 'test@test.com' });
  if (testUser) {
    console.log('====== TEST USER ANALYSIS ======');
    console.log('Test user found:', JSON.stringify(testUser, null, 2));
    console.log('User ID:', testUser._id);
    console.log('User ID type:', typeof testUser._id);
    console.log('User ID string:', testUser._id.toString());
    
    // Try different ways to find the account
    console.log('====== ACCOUNT LOOKUP ATTEMPTS ======');
    
    // 1. Direct ObjectId lookup
    const userAccount1 = await db.collection('account').findOne({ userId: testUser._id });
    console.log('Account lookup (ObjectId):', userAccount1);
    
    // 2. String ID lookup
    const userAccount2 = await db.collection('account').findOne({ userId: testUser._id.toString() });
    console.log('Account lookup (string):', userAccount2);
    
    // 3. Using the user's `id` field (Better Auth ID)
    const userAccount3 = await db.collection('account').findOne({ userId: testUser.id });
    console.log('Account lookup (user.id):', userAccount3);
    
    // 4. Check if accountId field matches email
    const userAccount4 = await db.collection('account').findOne({ accountId: testUser.email });
    console.log('Account lookup (accountId = email):', userAccount4);
    
    // 5. Check what's in the account collection for this user
    const allMatchingAccounts = await db.collection('account').find({
      $or: [
        { userId: testUser._id },
        { userId: testUser._id.toString() },
        { userId: testUser.id },
        { accountId: testUser.email }
      ]
    }).toArray();
    console.log('All matching accounts:', JSON.stringify(allMatchingAccounts, null, 2));
  }
  
  await client.close();
  
  console.log('====== ANALYSIS COMPLETE ======');
  console.log('The issue is likely in how Better Auth expects the userId field to be stored.');
  console.log('Better Auth MongoDB adapter expects specific field relationships.');
}

debugAuth().catch(console.error);