// Import required modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS to allow specific origins
app.use(cors({
  origin: 'https://65a5595df8ae3103ee70c96d--reliable-fudge-76ec88.netlify.app' // Add your frontend URL here
}));

// Connect to MongoDB
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

// Use routes for handling paths
app.use('/', customerRoutes);
app.use('/', bookingRoutes);

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
