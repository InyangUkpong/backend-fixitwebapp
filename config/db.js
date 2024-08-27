// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// const dBuri = 'mongodb://localhost:27017/fixitwebapp';
const dBuri = 'mongodb+srv://inyangweb:eMmjuX6r0sFan6Ee@fixitwebapp.zq4ql.mongodb.net/';

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