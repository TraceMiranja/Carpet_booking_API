// Import required modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");
const customers = require("./models/customers");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const forgetPasswordRoutes = require("./routes/forgetPasswordRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS to allow specific origins
app.use(
  cors({
    origin: "http://localhost:5173", // Added my frontend URL here
  })
);

// Connect to MongoDB
mongoose.set("strictQuery", false);
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
app.use("/", customerRoutes);
app.use("/", bookingRoutes);
app.use("/", forgetPasswordRoutes);

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
