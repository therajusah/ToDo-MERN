
require('dotenv').config();
const mongoose = require("mongoose");

const conn = async () => {
    try {
        const { DB_USERNAME, DB_PASSWORD} = process.env;
        const encodedPassword = encodeURIComponent(DB_PASSWORD);
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${encodedPassword}@cluster0.83rwe1r.mongodb.net/`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

conn();


