// Simple script to test and view database records
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Checking database...\n');
    
    // Get all subscriptions
    const subscriptions = await prisma.subscription.findMany();
    
    if (subscriptions.length === 0) {
      console.log('❌ No subscriptions found in database.');
      console.log('💡 Try clicking the "Upgrade to Pro" button on the billing page.\n');
    } else {
      console.log(`✅ Found ${subscriptions.length} subscription(s):\n`);
      subscriptions.forEach((sub, index) => {
        console.log(`--- Subscription ${index + 1} ---`);
        console.log(`ID: ${sub.id}`);
        console.log(`User ID: ${sub.userId}`);
        console.log(`Plan: ${sub.plan}`);
        console.log(`Cadence: ${sub.cadence}`);
        console.log(`Status: ${sub.status}`);
        console.log(`Created: ${sub.createdAt}`);
        console.log(`Updated: ${sub.updatedAt}`);
        console.log(`Expires: ${sub.expiresAt || 'N/A'}`);
        console.log('');
      });
    }
    
    // Test creating a subscription
    console.log('🧪 Testing database write...');
    const testSub = await prisma.subscription.upsert({
      where: { userId: 'test-user' },
      update: {
        plan: 'Pro',
        cadence: 'Monthly',
        status: 'active',
      },
      create: {
        userId: 'test-user',
        plan: 'Pro',
        cadence: 'Monthly',
        status: 'active',
      },
    });
    console.log('✅ Database write test successful!');
    console.log(`   Created/Updated subscription for user: ${testSub.userId}\n`);
    
    // Clean up test record
    await prisma.subscription.delete({
      where: { userId: 'test-user' },
    });
    console.log('🧹 Cleaned up test record\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'P2002') {
      console.log('💡 This means a record with that userId already exists (which is expected)');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();

