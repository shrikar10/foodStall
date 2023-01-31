const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "foodstallorders",
});

connection.connect();

var userid = 4;
var uname = "rocky bhai";

var query = `INSERT INTO sample
        (userid, uname) VALUES(20, ?);`;

connection.query(query, [userid, uname], (err, rows) => {
  if (err) throw err;
  console.log("Row inserted with id = " + rows.insertId);
});
