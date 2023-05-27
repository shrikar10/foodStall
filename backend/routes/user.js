const express = require("express");
const router = express.Router();
const connectiontoDB = require("../controllers/db");
const connection = connectiontoDB();

var addquery = `INSERT INTO users(user_id, order_id,first_name, last_name,phone_number, address) VALUES(?,?,?,?,?,?);`;
var delquery = `delete from users where user_id=?;`;
var updatequery = `update users set order_id=?,first_name=?, last_name=?,phone_number = ?, address=? where user_id = ?;` ;
var getquery = `select * from users ;` ;
var getuserbyid = `select order_id,first_name, last_name,phone_number, address  from users where user_id = ?;` ;




router.post("/addUser", (req, res) => {
  connection.connect();
  connection.query(addquery,
    [req.body.user_id,
    req.body.order_id,
    req.body.first_name,
    req.body.last_name,
    req.body.phone_number,
    req.body.address],
     (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results[0]);
    }
  });
  return res.send("<h1>User added sucessfully</h1>");
});


router.delete("/deleteUser/:id", (req, res) => {
    connection.connect();
    const user_id = req.params.id;
    connection.query(delquery,
      [user_id],
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


router.put("/updateUser/:id", (req, res) => {
    connection.connect();
    const user_id = req.params.id;
    const values =[req.body.order_id,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.address]
    connection.query(updatequery,
      [...values,user_id],
       (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
      }
    });
    return res.send("<h1>User updated sucessfully</h1>");
  });


router.get("/getUserById/:id", (req, res) => {
  connection.connect();
  const user_id = req.params.id;
  connection.query(getuserbyid,
    [user_id],
     (error, results) => {
      if (error) {
      console.error(error);
    } else {
      return res.json(results);
    }})
});


router.get("/getUser", (req, res) => {
    connection.connect();
    connection.query(getquery,
      // [req.body.user_id],
       (error, results) => {
      if (error) {
        console.error(error);
      } else {
        return res.json(results);
      }
    });
    
  });





module.exports = router;



