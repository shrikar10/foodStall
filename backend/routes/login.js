const express = require("express");
const router = express.Router();
const connectiontoDB = require("../controllers/db");
const connection = connectiontoDB();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var checkUser = `select * from login where user_id = ? and password = ?;`;
var checkPass = `select password from login where user_id = ? ;`;
var addUser = `INSERT INTO login(user_id, password) VALUES(?,?);`;
router.get("/login", (req, res) => {
  connection.connect();
  const password = req.body.password;
  connection.query(checkPass, [req.body.user_id], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      const hash = results[0].password;
      bcrypt.compare(password, hash, function (err, result) {
        if (result == true) {
          return res.send("Login Successful");
        } else {
          return res.send("Wrong username/password");
        }
      });
    }
  });
  
});

router.post("/signup", (req, res) => {
  connection.connect();
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      console.error(err);
    } else {
      connection.query(addUser, [req.body.user_id, hash], (error, results) => {
        if (error) {
          console.error(error);
        } else {
          res.send("Password added");
        }
      });
    }
  });
});
module.exports = router;
