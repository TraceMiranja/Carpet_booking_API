// Import required modules
const express = require("express");
const router = express.Router();
const Customer = require("../models/customers");

// Middleware to parse JSON data
router.use(express.json());

// Route to get the root URL for customers
router.get("/", (req, res) => {
  res.send("Welcome to the Carpet Booking Management API by Tracy Miranja");
});

// Route to add a new customer (and wpAdmin user if it doesn't exist)
router.post("/customers", async (req, res) => {
  try {
    const existingAdminUser = await Customer.findOne({ role: "wpAdmin" });
    if (!existingAdminUser) {
      // Create a new wpAdmin user if it doesn't exist
      const wpAdminUser = new Customer({
        name: "WP Admin",
        username: "wpadmin",
        email: "wpadmin@example.com",
        password: "wpAdmin*23#&",
        role: "wpAdmin",
        dateOfBirth: new Date(),
        phoneNumber: "1234567890",
        location: "Some Location",
      });
      await wpAdminUser.save();
    }

    // Create a new customer with the request body data
    const newCustomer = new Customer(req.body);
    await newCustomer.save();

    res.status(201).send("Customer added successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error adding customer: " + error.message);
  }
});

// Route to get all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error retrieving customers");
  }
});

// Route to update a customer
router.put("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedCustomer) {
      res.json(updatedCustomer);
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error updating customer: " + error.message);
  }
});

// Route to delete a customer by _id
router.delete("/customers/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (deletedCustomer) {
      res.send(`Customer with id ${req.params.id} was deleted successfully`);
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error deleting customer: " + error.message);
  }
});

// Export the router
module.exports = router;
