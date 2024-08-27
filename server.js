// import express from 'express';
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
const express = require('express');
const connectDB = require('./config/db');
dotenv.config();


const app = express();
connectDB();
app.use(express.json()); // For Parsing application/json

// Define routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8080;

// let me create a simple route below
app.get("/", (req, res) => {
    res.json({message: "The FixIt App is running on docker container version 3"})
});
// let me listen to the port below
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

