const express = require("express");
const app = express();
require("dotenv").config();
//const userRouter = require("./api/users/userRoutes");
const userRouter = require("./mobile/routes/users");
const orderRouter = require("./mobile/routes/orders.js");

app.use(express.json());
app.use("/api/mobile/users", userRouter);
app.use("/api/mobile/orders", orderRouter);

app.listen(9000, () => console.log("app is listning on 9000"));
