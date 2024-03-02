require("dotenv").config();
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
        expiresIn: "10min",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
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
router.post("/resetpassword/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.send({ status: "Error with token" });
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        customers
          .findByIdAndUpdate({ _id: id }, { password: hash })
          .then((u) => res.send({ status: "success" }))
          .catch((error) => {
            res.send({ status: error });
          });
      });
    }
  });
});

module.exports = router;
