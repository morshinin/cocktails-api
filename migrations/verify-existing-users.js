const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

// Use cloud MongoDB, not local
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error('❌ MONGO_URL not found in .env file');
    process.exit(1);
}

async function migrateUsers() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        console.log('📍 Connection URL:', MONGO_URL.replace(/\/\/.*:.*@/, '//<credentials>@')); // Hide credentials

        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');
        console.log('📂 Database name:', mongoose.connection.name);
        console.log('📦 Collection name:', User.collection.name);
        console.log('');

        // First, let's see ALL users and their emailVerified status
        const allUsers = await User.find({}, { email: 1, emailVerified: 1, createdAt: 1 });
        console.log(`📊 Total users in database: ${allUsers.length}`);
        console.log('👥 All users:');
        allUsers.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.email} - emailVerified: ${user.emailVerified} (${typeof user.emailVerified})`);
        });
        console.log('');

        // Find all users where emailVerified field doesn't exist or is false
        const usersToUpdate = await User.find({
            $or: [
                { emailVerified: { $exists: false } },
                { emailVerified: false },
                { emailVerified: null }
            ]
        });

        console.log(`📊 Found ${usersToUpdate.length} users to update\n`);

        if (usersToUpdate.length === 0) {
            console.log('✅ No users need migration. All users are already verified.');
            await mongoose.connection.close();
            return;
        }

        // Show users that will be updated
        console.log('👥 Users to be verified:');
        usersToUpdate.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.email} (created: ${user.createdAt?.toLocaleDateString() || 'unknown'})`);
        });
        console.log('');

        // Update all users to set emailVerified to true
        const result = await User.updateMany(
            {
                $or: [
                    { emailVerified: { $exists: false } },
                    { emailVerified: false },
                    { emailVerified: null }
                ]
            },
            {
                $set: {
                    emailVerified: true,
                    emailVerificationToken: null,
                    emailVerificationExpires: null
                }
            }
        );

        console.log(`✅ Migration completed successfully!`);
        console.log(`   - Modified: ${result.modifiedCount} users`);
        console.log(`   - Matched: ${result.matchedCount} users\n`);

        // Verify the migration
        const verifiedCount = await User.countDocuments({ emailVerified: true });
        const totalCount = await User.countDocuments();

        console.log('📈 Final statistics:');
        console.log(`   - Total users: ${totalCount}`);
        console.log(`   - Verified users: ${verifiedCount}`);
        console.log(`   - Unverified users: ${totalCount - verifiedCount}\n`);

        await mongoose.connection.close();
        console.log('✅ Database connection closed');
        console.log('🎉 Migration finished successfully!\n');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

// Run migration
console.log('🚀 Starting email verification migration...\n');
migrateUsers();
