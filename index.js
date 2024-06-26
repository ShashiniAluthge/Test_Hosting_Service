const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
//const userRouter = require("./mobile/routes/users"); //  api/mobile/users/login
var cookieParser = require('cookie-parser')
app.use(cookieParser())



const userRouter = require("./mobile/routes/users");  //  api/mobile/users/login

const orderRouter = require("./mobile/routes/orders.js");
// const webOrderRouter = require("./web/routes/orders.js");
// const webBranchuser = require("./web/routes/branchuser.js");

// const webAdmin = require("./web/routes/admin.js");

app.use(express.json());
app.use("/api/mobile/users", userRouter);
app.use("/api/mobile/orders", orderRouter);

// app.use("/orders", webOrderRouter);
// app.use("/admin", webAdmin);
// app.use("/branchuser",webBranchuser);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
