// Import required modules
const express = require("express");
const router = express.Router(); // Create a router object
const Customer = require("../models/customers"); // Import the Customer model

// Middleware to parse JSON data
router.use(express.json());

// Route to get the root URL for customers
router.get("/", (req, res) => {
  res.send("Welcome to the Carpet Booking Management API by Tracy Miranja");
});

// Route to add a new customer
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body); // Create a new customer with the request body data
    await newCustomer.save(); // Save the new customer
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
      req.params.id, // Get the _id from URL parameter
      req.body, // Update customer with data from request body
      { new: true } // Return the updated object
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
