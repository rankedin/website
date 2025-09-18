import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function validateDatabase() {
  console.log('🔍 Starting database validation...');

  try {
    // Check for duplicates
    console.log('\n📊 Checking for duplicates...');

    const userDuplicates = (await prisma.$queryRaw`
      SELECT username, COUNT(*) as count
      FROM users
      GROUP BY username
      HAVING COUNT(*) > 1
    `) as Array<{ username: string; count: number }>;

    if (userDuplicates.length > 0) {
      console.log('❌ Found duplicate users:');
      userDuplicates.forEach(dup => {
        console.log(`  - ${dup.username}: ${dup.count} times`);
      });
    } else {
      console.log('✅ No duplicate users found');
    }

    const repoDuplicates = (await prisma.$queryRaw`
      SELECT "fullName", COUNT(*) as count
      FROM repositories
      GROUP BY "fullName"
      HAVING COUNT(*) > 1
    `) as Array<{ fullName: string; count: number }>;

    if (repoDuplicates.length > 0) {
      console.log('❌ Found duplicate repositories:');
      repoDuplicates.forEach(dup => {
        console.log(`  - ${dup.fullName}: ${dup.count} times`);
      });
    } else {
      console.log('✅ No duplicate repositories found');
    }

    const topicDuplicates = (await prisma.$queryRaw`
      SELECT name, COUNT(*) as count
      FROM topics
      GROUP BY name
      HAVING COUNT(*) > 1
    `) as Array<{ name: string; count: number }>;

    if (topicDuplicates.length > 0) {
      console.log('❌ Found duplicate topics:');
      topicDuplicates.forEach(dup => {
        console.log(`  - ${dup.name}: ${dup.count} times`);
      });
    } else {
      console.log('✅ No duplicate topics found');
    }

    // Check for invalid data
    console.log('\n🔧 Checking for invalid data...');

    const negativeUsers = await prisma.user.count({
      where: {
        OR: [
          { followers: { lt: 0 } },
          { following: { lt: 0 } },
          { publicRepos: { lt: 0 } },
          { totalStars: { lt: 0 } },
        ],
      },
    });

    if (negativeUsers > 0) {
      console.log(`❌ Found ${negativeUsers} users with negative values`);
    } else {
      console.log('✅ No users with negative values');
    }

    const negativeRepos = await prisma.repository.count({
      where: {
        OR: [
          { stars: { lt: 0 } },
          { forks: { lt: 0 } },
          { watchers: { lt: 0 } },
          { openIssues: { lt: 0 } },
          { size: { lt: 0 } },
        ],
      },
    });

    if (negativeRepos > 0) {
      console.log(
        `❌ Found ${negativeRepos} repositories with negative values`
      );
    } else {
      console.log('✅ No repositories with negative values');
    }

    const negativeTopics = await prisma.topic.count({
      where: {
        OR: [{ score: { lt: 0 } }, { repositories: { lt: 0 } }],
      },
    });

    if (negativeTopics > 0) {
      console.log(`❌ Found ${negativeTopics} topics with negative values`);
    } else {
      console.log('✅ No topics with negative values');
    }

    // Check for missing required fields
    console.log('\n📋 Checking data completeness...');

    const incompleteUsers = await prisma.user.count({
      where: {
        username: '',
      },
    });

    if (incompleteUsers > 0) {
      console.log(
        `⚠️ Found ${incompleteUsers} users with missing or empty usernames`
      );
    } else {
      console.log('✅ All users have valid usernames');
    }

    const incompleteRepos = await prisma.repository.count({
      where: {
        OR: [{ fullName: '' }, { htmlUrl: '' }],
      },
    });

    if (incompleteRepos > 0) {
      console.log(
        `⚠️ Found ${incompleteRepos} repositories with missing required fields`
      );
    } else {
      console.log('✅ All repositories have valid required fields');
    }

    // Get statistics
    console.log('\n📈 Database Statistics:');

    const userCount = await prisma.user.count();
    const repoCount = await prisma.repository.count();
    const topicCount = await prisma.topic.count();

    console.log(`👥 Total Users: ${userCount}`);
    console.log(`📦 Total Repositories: ${repoCount}`);
    console.log(`🏷️ Total Topics: ${topicCount}`);

    if (repoCount > 0) {
      const totalStars = await prisma.repository.aggregate({
        _sum: { stars: true },
      });
      console.log(`⭐ Total Stars: ${totalStars._sum.stars || 0}`);
    }

    console.log('\n✅ Database validation completed!');
  } catch (error) {
    console.error('❌ Error during database validation:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the validation
validateDatabase()
  .then(() => {
    console.log('🎉 Validation script finished!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Validation script failed:', error);
    process.exit(1);
  });
