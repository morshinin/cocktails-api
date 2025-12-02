# Database Migrations

This directory contains database migration scripts.

## Running Migrations

### Verify Existing Users Migration

This migration sets `emailVerified: true` for all users created before the email verification feature was implemented.

**To run:**
```bash
cd cocktails-api
node migrations/verify-existing-users.js
```

**What it does:**
- Finds all users where `emailVerified` is `false` or doesn't exist
- Sets `emailVerified: true` for these users
- Clears any verification tokens
- Shows detailed statistics

**Safe to run multiple times** - it only updates users that need updating.

## Creating New Migrations

When creating a new migration:
1. Create a new file in this directory with a descriptive name
2. Use the same connection pattern as existing migrations
3. Add error handling and logging
4. Document the migration in this README
