const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
require("dotenv").config();

//Routes
const emailRoute = require("./routes/email");
const orderRoute = require("./routes/order");


//express
const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: "*" }));



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/", emailRoute);
app.use("/api/", orderRoute);




const port = process.env.PORT;
app.listen(port);

console.log(`App is listening on ${port}`);
