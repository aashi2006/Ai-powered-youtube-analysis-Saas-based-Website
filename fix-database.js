// Script to fix database issues - remove orphaned subscriptions
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDatabase() {
  try {
    console.log('🔍 Checking for orphaned subscriptions...\n');
    
    // Get all subscriptions WITHOUT the relation (to avoid the error)
    const subscriptions = await prisma.subscription.findMany({
      select: {
        id: true,
        userId: true,
        plan: true,
        cadence: true,
        status: true,
      },
    });
    
    console.log(`Found ${subscriptions.length} subscription(s)\n`);
    
    // Get all user IDs
    const users = await prisma.user.findMany({
      select: { id: true },
    });
    const userIds = new Set(users.map(u => u.id));
    
    // Find orphaned subscriptions (where userId doesn't exist in users)
    const orphaned = subscriptions.filter(sub => !userIds.has(sub.userId));
    
    if (orphaned.length === 0) {
      console.log('✅ No orphaned subscriptions found!\n');
    } else {
      console.log(`⚠️  Found ${orphaned.length} orphaned subscription(s):\n`);
      orphaned.forEach(sub => {
        console.log(`   - ID: ${sub.id}, User ID: ${sub.userId}, Plan: ${sub.plan}`);
      });
      console.log('\n🧹 Cleaning up orphaned subscriptions...\n');
      
      // Delete orphaned subscriptions
      for (const sub of orphaned) {
        await prisma.subscription.delete({
          where: { id: sub.id },
        });
        console.log(`✅ Deleted orphaned subscription: ${sub.id}`);
      }
      
      console.log(`\n✅ Cleaned up ${orphaned.length} orphaned subscription(s)\n`);
    }
    
    // Get remaining subscriptions
    const remaining = await prisma.subscription.findMany({
      select: {
        id: true,
        userId: true,
        plan: true,
        status: true,
      },
    });
    
    console.log('📊 Current database state:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Subscriptions: ${remaining.length}`);
    
    if (remaining.length > 0) {
      console.log('\nCurrent subscriptions:');
      for (const sub of remaining) {
        const user = await prisma.user.findUnique({
          where: { id: sub.userId },
          select: { email: true },
        });
        console.log(`   - User: ${user?.email || 'Unknown'}, Plan: ${sub.plan}, Status: ${sub.status}`);
      }
    }
    
    console.log('\n✅ Database is now clean! Prisma Studio should work now.\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

fixDatabase();

