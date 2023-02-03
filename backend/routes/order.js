const express = require("express");
const router = express.Router();
const connectiontoDB = require("../controllers/db");
const connection = connectiontoDB(); 

var getquery = `select * from orders where order_id  = ?;` ;
var addquery = `INSERT INTO orders(order_id, item_name,email,item_price,phone_number,quantity,location) VALUES(?,?,?,?,?,?,?);`;
var delquery = `delete  from orders where order_id =?;`;
var updatequery = `update orders set  item_name=?,email=?,item_price=?,phone_number=?,quantity=?,location=?  where order_id=?;`;

router.get("/getorder", (req, res) => {
  connection.connect();
  connection.query(getquery,
    [req.body.order_id], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      return res.send(results);
    }
  })
});




router.post("/addorder", (req, res) => {
  connection.connect();
  connection.query(addquery,
    [req.body.order_id,
    req.body.item_name,
    req.body.email,
    req.body.item_price,
    req.body.phone_number,
    req.body.quantity,
    req.body.location],
     (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results[0]);
      var body = {email:req.body.email,
        message:"Thank you for ordering!!!!!!"}
        fetch('http://localhost:8000/api/send-email', {
          Method: 'POST',
          Headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          Body: body,
          Cache: 'default'
        })
    }
  });
  
  return res.send("<h1>New order added sucessfully</h1>");
});



router.delete("/deleteorder", (req, res) => {
  connection.connect();
  connection.query(delquery,
    [req.body.order_id],
     (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results[0]);
    }
  });
  return res.send("<h1>order deleted sucessfully</h1>");
});


//update
router.put("/updateorder", (req, res) => {
  connection.connect();
  // var user_id = req.params.id;
  connection.query(updatequery,
    [
      req.body.item_name,
      req.body.email,
    req.body.item_price,
      req.body.phone_number,
      req.body.quantity,
      req.body.location,
      req.body.order_id,],
     (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
    }
  });
  return res.send("<h1>order updated sucessfully</h1>");
});

module.exports = router;
