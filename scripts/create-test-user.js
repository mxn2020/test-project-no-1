// Simple script to register a test user via Better Auth API
console.log('To create a test user, use the registration endpoint:');
console.log('');
console.log('curl -X POST http://localhost:8889/api/auth/sign-up/email \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"email": "test@test.com", "password": "test@test.com", "name": "Test User"}\'');
console.log('');
console.log('Or go to http://localhost:5176/register in your browser and create an account.');
console.log('');

// Let's try using fetch to register the user
async function registerTestUser() {
  try {
    const response = await fetch('http://localhost:8889/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'test@test.com',
        name: 'Test User'
      })
    });
    
    const result = await response.text();
    console.log('Registration response:', response.status, result);
    
    if (response.ok) {
      console.log('✅ Test user registered successfully!');
      console.log('You can now login with:');
      console.log('Email: test@test.com');
      console.log('Password: test@test.com');
    } else {
      console.log('❌ Registration failed:', result);
    }
  } catch (error) {
    console.error('Error registering test user:', error);
    console.log('Make sure the dev server is running: npm run dev:netlify');
  }
}

registerTestUser();