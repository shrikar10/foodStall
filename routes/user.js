const express = require("express");
const router = express.Router();
const connectiontoDB = require("../controllers/db");
const connection = connectiontoDB();

var addquery = `INSERT INTO users(user_id, order_id,first_name, last_name,phone_number, address) VALUES(?,2,?,"S","123","ABC");`;
var delquery = `delete from users where user_id=?;`;
var updatequery = `update users set phone_number = ? where user_id = ?;` ;

router.post("/addUser", (req, res) => {
  connection.connect();
  connection.query(addquery,
    [req.body.user_id,
    req.body.first_name],
     (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results[0]);
    }
  });
  return res.send("<h1>User added sucessfully</h1>");
});


router.delete("/deleteUser", (req, res) => {
    connection.connect();
    connection.query(delquery,
      [req.body.user_id],
       (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(results[0]);
      }
    });
    return res.send("<h1>User deleted sucessfully</h1>");
  });


  
// router.put("/updateUser/:id", (req, res) => {
//     connection.connect();
//     var user_id = req.params.id;
//     connection.query(updatequery,
//       [req.body.phone_number,
//         user_id],
//        (error, results) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log(results);
//       }
//     });
//     return res.send("<h1>User updated sucessfully</h1>");
//   });


router.put("/updateUser", (req, res) => {
    connection.connect();
    // var user_id = req.params.id;
    connection.query(updatequery,
      [req.body.phone_number,
        req.body.user_id],
       (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
      }
    });
    return res.send("<h1>User updated sucessfully</h1>");
  });

module.exports = router;



