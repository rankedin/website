import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupDatabase() {
  console.log('🧹 Starting database cleanup...');

  try {
    // Clean up duplicate users (keep the one with most recent update)
    console.log('📝 Cleaning up duplicate users...');
    const duplicateUsers = (await prisma.$queryRaw`
      SELECT username, COUNT(*) as count
      FROM users
      GROUP BY username
      HAVING COUNT(*) > 1
    `) as Array<{ username: string; count: number }>;

    for (const dup of duplicateUsers) {
      // Keep the most recently updated user, delete others
      const usersToDelete = await prisma.user.findMany({
        where: { username: dup.username },
        orderBy: { updatedAt: 'desc' },
        skip: 1, // Skip the first (most recent)
        select: { id: true },
      });

      if (usersToDelete.length > 0) {
        await prisma.user.deleteMany({
          where: {
            id: { in: usersToDelete.map(u => u.id) },
          },
        });
        console.log(
          `✅ Removed ${usersToDelete.length} duplicate users for ${dup.username}`
        );
      }
    }

    // Clean up duplicate repositories (keep the one with highest stars)
    console.log('📦 Cleaning up duplicate repositories...');
    const duplicateRepos = (await prisma.$queryRaw`
      SELECT "fullName", COUNT(*) as count
      FROM repositories
      GROUP BY "fullName"
      HAVING COUNT(*) > 1
    `) as Array<{ fullName: string; count: number }>;

    for (const dup of duplicateRepos) {
      // Keep the repository with highest stars, delete others
      const reposToDelete = await prisma.repository.findMany({
        where: { fullName: dup.fullName },
        orderBy: { stars: 'desc' },
        skip: 1, // Skip the first (highest stars)
        select: { id: true },
      });

      if (reposToDelete.length > 0) {
        await prisma.repository.deleteMany({
          where: {
            id: { in: reposToDelete.map(r => r.id) },
          },
        });
        console.log(
          `✅ Removed ${reposToDelete.length} duplicate repositories for ${dup.fullName}`
        );
      }
    }

    // Clean up duplicate topics (keep the one with highest score)
    console.log('🏷️ Cleaning up duplicate topics...');
    const duplicateTopics = (await prisma.$queryRaw`
      SELECT name, COUNT(*) as count
      FROM topics
      GROUP BY name
      HAVING COUNT(*) > 1
    `) as Array<{ name: string; count: number }>;

    for (const dup of duplicateTopics) {
      // Keep the topic with highest score, delete others
      const topicsToDelete = await prisma.topic.findMany({
        where: { name: dup.name },
        orderBy: { score: 'desc' },
        skip: 1, // Skip the first (highest score)
        select: { id: true },
      });

      if (topicsToDelete.length > 0) {
        await prisma.topic.deleteMany({
          where: {
            id: { in: topicsToDelete.map(t => t.id) },
          },
        });
        console.log(
          `✅ Removed ${topicsToDelete.length} duplicate topics for ${dup.name}`
        );
      }
    }

    // Fix negative values
    console.log('🔧 Fixing negative values...');

    // Fix negative followers/following
    await prisma.user.updateMany({
      where: { followers: { lt: 0 } },
      data: { followers: 0 },
    });
    await prisma.user.updateMany({
      where: { following: { lt: 0 } },
      data: { following: 0 },
    });

    // Fix negative repository stats
    await prisma.repository.updateMany({
      where: { stars: { lt: 0 } },
      data: { stars: 0 },
    });
    await prisma.repository.updateMany({
      where: { forks: { lt: 0 } },
      data: { forks: 0 },
    });
    await prisma.repository.updateMany({
      where: { watchers: { lt: 0 } },
      data: { watchers: 0 },
    });

    // Fix negative topic repositories count
    await prisma.topic.updateMany({
      where: { repositories: { lt: 0 } },
      data: { repositories: 0 },
    });

    console.log('✅ Database cleanup completed successfully!');
  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanupDatabase()
  .then(() => {
    console.log('🎉 Cleanup script finished!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Cleanup script failed:', error);
    process.exit(1);
  });
