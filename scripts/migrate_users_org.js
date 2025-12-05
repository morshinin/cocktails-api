const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Organization = require('../models/Organization');

const MONGO_URL = process.env.MONGO_URL;

const migrate = async () => {
    try {
        if (!MONGO_URL) {
            throw new Error("MONGO_URL not found in environment variables");
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URL, {
            dbName: 'cocktails',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Find the default organization (first one)
        const organization = await Organization.findOne();
        if (!organization) {
            console.error('❌ No organizations found! Cannot migrate users.');
            process.exit(1);
        }
        console.log(`Using organization: ${organization.name} (${organization._id})`);

        // Find users without organizationId
        const usersToUpdate = await User.find({
            $or: [
                { organizationId: { $exists: false } },
                { organizationId: null }
            ]
        });

        console.log(`Found ${usersToUpdate.length} users to update.`);

        if (usersToUpdate.length === 0) {
            console.log('No migration needed.');
            process.exit(0);
        }

        // Update users
        const result = await User.updateMany(
            {
                $or: [
                    { organizationId: { $exists: false } },
                    { organizationId: null }
                ]
            },
            { $set: { organizationId: organization._id } }
        );

        console.log(`✅ Successfully updated ${result.modifiedCount} users.`);

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

migrate();
