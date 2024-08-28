import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Database connection
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
console.log(`MongoDB URI: ${MONGO_URI}`); // Debugging line to check if the URI is correct

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        console.error(err);
        process.exit(1);
    });