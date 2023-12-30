// Import required modules
const express = require('express');
const router = express.Router(); // Create a router object
const Booking = require('../models/bookings'); // Import the Booking model

// Middleware to parse JSON data
router.use(express.json());

// Route to get the root URL for bookings
router.get('/', (req, res) => {
    res.send('Welcome to the Carpet Booking Management API by Tracy Miranja');
});

// Route to add a new booking
router.post('/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body); // Create a new booking with the request body data
        await newBooking.save(); // Save the new booking
        res.status(201).send('Booking added successfully');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error adding booking: " + error.message);
    }
});

// Route to get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('customer_ID');
        res.json(bookings);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error retrieving bookings");
    }
});

// Route to update a booking
router.put('/bookings/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, // Get the _id from URL parameter
            req.body, // Update booking with data from request body
            { new: true } // Return the updated object
        );
        if (updatedBooking) {
            res.json(updatedBooking);
        } else {
            res.status(404).send('Booking not found');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error updating booking: " + error.message);
    }
});

// Route to delete a booking by _id
router.delete('/bookings/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        if (deletedBooking) {
            res.send(`Booking with id ${req.params.id} was deleted successfully`);
        } else {
            res.status(404).send('Booking not found');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error deleting booking: " + error.message);
    }
});

// Export the router
module.exports = router;
