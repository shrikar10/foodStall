const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  secure: true,
});
router.post("/send-email", (req, res) => {
  // console.log(req.body.email);
  // code to send the email goes here
  transporter.sendMail(
    {
      from: process.env.USER,
      to: req.body.email,
      subject: "Hello World thank you for subscribing",
      text: req.body.message,
    },
    (error, info) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send("Email sent: " + info.response);
      }
    }
  );
});

module.exports = router;
