const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const customers = require("../models/customers");

const router = express.Router();

router.post("/forgotpassword", (req, res) => {
  console.log("Forgot password route hit");
  const { email } = req.body;
  customers
    .findOne({ email: email })
    .then((customer) => {
      if (!customer) {
        return res.send({ status: "user not exist" });
      }
      const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
        expiresIn: "300sec",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Reset your password",
        text: `http://localhost:5173/resetpassword/${customer._id}/${token}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.send({ status: "error sending email" });
        } else {
          return res.send({ status: "success" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ status: "internal server error" });
    });
});

module.exports = router;
