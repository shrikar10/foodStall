const express = require("express");
const router = express.Router();
const connectiontoDB = require("../controllers/db");
const connection = connectiontoDB();
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");
const cookieParser = require("cookie-parser");

var checkPass = `select password from login where user_id = ? ;`;
var addUser = `INSERT INTO login(user_id, password) VALUES(?,?);`;

// Configure session middleware
router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(
  session({
    key: "user_id",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// Authentication middleware
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post("/login", (req, res) => {
  connection.connect();
  const password = req.body.password;
  connection.query(checkPass, [req.body.user_id], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      const hash = results[0].password;
      bcrypt.compare(password, hash, function (err, result) {
        if (result == true) {
          req.session.user = result;
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
