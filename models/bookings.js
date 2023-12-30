const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  apartment: { type: String, required: true },
  houseNumber: { type: String, required: true },
  carpetSize: { type: String, required: true },
  collectionTime: { type: Date, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
