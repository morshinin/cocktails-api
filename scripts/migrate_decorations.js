require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error("❌ MONGO_URL is not defined in .env");
    process.exit(1);
}

const migrate = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: "cocktails",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");

        const recipes = await Recipe.find({});
        let updatedCount = 0;

        for (const recipe of recipes) {
            // Check if decoration is a string (or not an array)
            if (recipe.decoration && !Array.isArray(recipe.decoration)) {
                console.log(`Migrating recipe: ${recipe.name}`);
                recipe.decoration = [recipe.decoration];
                await recipe.save();
                updatedCount++;
            }
        }

        console.log(`✅ Migration complete. Updated ${updatedCount} recipes.`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
};

migrate();
