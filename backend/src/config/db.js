const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || process.env.DATA_BASE_URL;
        if (!uri) {
            throw new Error('No MongoDB URI provided. Set MONGO_URI or DATA_BASE_URL in .env');
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Failed", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
