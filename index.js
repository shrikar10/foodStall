const nodemailer = require("nodemailer");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
require("dotenv").config();

//express
const app = express();

//middleware
app.use(express.json());
app.use(cors({origin: '*'}));
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  secure: true,
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/send-email", (req, res) => {
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

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'foodstallorders'
});

connection.connect();

var userid =4
var uname = "rocky bhai"
// var email = "Srinivas@gmail.com"

var query = `INSERT INTO sample
        (userid, uname) VALUES(20, ?);`


        connection.query(query, [userid, uname], (err, rows) => {
              if (err) throw err;
              console.log("Row inserted with id = "
                  + rows.insertId);
          });



const port = process.env.PORT;
app.listen(port);


console.log(`App is listening on ${port}`)





