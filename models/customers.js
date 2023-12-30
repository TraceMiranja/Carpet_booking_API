const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('Customer', customerSchema);
