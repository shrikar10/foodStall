const express = require("express");
const router = express.Router();
const connectiontoDB = require("../controllers/db");
const connection = connectiontoDB();



router.get("/order", (req, res) => {
  connection.connect();
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results[0]);
    }
  });
  return res.send("<h1>Thank you for ordering<h1/>");
});

module.exports = router;
