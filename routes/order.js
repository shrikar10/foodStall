const express = require("express");
const router = express.Router();

router.get("/order", (req, res) => {
  return res.send("<h1>Thank you for ordering<h1/>");
});

module.exports = router;
