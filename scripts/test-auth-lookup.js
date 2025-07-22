import { MongoClient } from 'mongodb';

async function testAuthLookup() {
  console.log('====== TESTING BETTER AUTH LOOKUP LOGIC ======');
  
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/geenius-template');
  await client.connect();
  const db = client.db();
  
  // This is how Better Auth looks up users for credential authentication
  const email = 'test@test.com';
  
  console.log('1. Looking up user by email...');
  const user = await db.collection('user').findOne({ email });
  console.log('User found:', user);
  
  if (user) {
    console.log('2. Looking up account by email (credential provider)...');
    const account = await db.collection('account').findOne({ 
      accountId: email,
      providerId: 'credential'
    });
    console.log('Account found:', account);
    
    if (account) {
      console.log('3. Verifying user-account relationship...');
      console.log('User ID:', user.id);
      console.log('Account userId:', account.userId);
      console.log('IDs match:', user.id === account.userId);
      
      console.log('4. Password hash format...');
      console.log('Password hash:', account.password);
      console.log('Hash format looks correct:', account.password.includes(':'));
    }
  }
  
  await client.close();
}

testAuthLookup().catch(console.error);