const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  carpetSize: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Define price as a Number type
    required: true,
  },
  collectionTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  booking_date: {
    type: Date,
    default: Date.now, // Automatically sets to current date
  },
  booking_time: {
    type: String, // Assuming time is stored in HH:MM format
    default: () => new Date().toLocaleTimeString(), // Automatically sets to current time
  },
  status: {
    type: String,
    enum: ["incomplete", "complete", "pending"],
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
