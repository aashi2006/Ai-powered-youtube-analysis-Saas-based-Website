// Script to create a test user directly in the database
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createTestUser() {
  try {
    console.log('🔧 Creating test user...\n');
    
    const email = 'test@example.com';
    const password = 'test123';
    const name = 'Test User';
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log('💡 Try signing in with:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}\n`);
      
      // Check if password is set
      if (!existingUser.password) {
        console.log('⚠️  User exists but has no password. Updating password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { email },
          data: { password: hashedPassword },
        });
        console.log('✅ Password updated!\n');
      }
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    
    console.log('✅ User created successfully!');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   ID: ${user.id}\n`);
    
    // Create default Free subscription
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: 'Free',
        cadence: 'Monthly',
        status: 'active',
      },
    });
    
    console.log('✅ Default Free subscription created!\n');
    console.log('🎉 You can now sign in with:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'P2002') {
      console.log('💡 User already exists. Try signing in instead.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();

