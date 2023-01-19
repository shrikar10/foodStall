const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config();

//express
const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  secure: true,
});

app.post("/send-email", (req, res) => {
  // code to send the email goes here
  transporter.sendMail(
    {
      from: "shivarajum42@gmail.com",
      to: "shivajyothiachar42@gmail.com",
      subject: "Hello World thank you for subscribing",
      text: "Regards Raju",
    },
    (error, info) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send("Email sent: " + info.response);
      }
    }
  );
  console.log("Mail sent");
});

const port = 8000;
app.listen(port);
