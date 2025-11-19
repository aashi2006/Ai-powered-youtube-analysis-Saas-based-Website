// Script to check users in database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...\n');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
      },
    });
    
    if (users.length === 0) {
      console.log('❌ No users found in database!\n');
      console.log('💡 You need to sign up first. Go to: http://localhost:3000/signup\n');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach((user, index) => {
        console.log(`--- User ${index + 1} ---`);
        console.log(`Email: ${user.email}`);
        console.log(`Name: ${user.name || 'N/A'}`);
        console.log(`ID: ${user.id}`);
        console.log(`Has Password: ${user.password ? 'Yes (hashed)' : 'No'}`);
        console.log(`Created: ${user.createdAt}`);
        console.log('');
      });
    }
    
    // Check for test@example.com specifically
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });
    
    if (testUser) {
      console.log('✅ test@example.com exists in database');
      if (!testUser.password) {
        console.log('⚠️  WARNING: User has no password! This might be the issue.');
      }
    } else {
      console.log('❌ test@example.com NOT found in database');
      console.log('💡 You need to create this account first at /signup');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();

