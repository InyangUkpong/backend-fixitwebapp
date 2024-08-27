// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// Defining the MongoDB URI
const dBuri = 'mongodb+srv://inyangweb:eMmjuX6r0sFan6Ee@fixitwebapp.zq4ql.mongodb.net/';

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('dBuri', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;