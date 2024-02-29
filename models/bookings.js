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
    default: Date.now,
  },
  booking_time: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
  status: {
    type: String,
    enum: ["incomplete", "complete", "pending"],
    default: "pending",
  },
  //added this for reset
  resetLink: {
    data: String,
    default: "",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
