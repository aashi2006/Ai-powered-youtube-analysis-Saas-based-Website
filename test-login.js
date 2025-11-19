// Script to test login functionality
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function testLogin() {
  try {
    console.log('🔍 Testing login functionality...\n');
    
    const email = 'test@example.com';
    const password = 'test123';
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }
    
    console.log('✅ User found:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Has Password: ${user.password ? 'Yes' : 'No'}\n`);
    
    if (!user.password) {
      console.log('❌ User has no password! This is the problem.');
      console.log('💡 Fixing by setting password...\n');
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      
      console.log('✅ Password set successfully!\n');
    }
    
    // Test password comparison
    console.log('🔐 Testing password verification...');
    const passwordsMatch = await bcrypt.compare(password, user.password);
    
    if (passwordsMatch) {
      console.log('✅ Password matches! Login should work.\n');
    } else {
      console.log('❌ Password does NOT match!');
      console.log('💡 Resetting password...\n');
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      
      console.log('✅ Password reset! Try logging in again.\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();

