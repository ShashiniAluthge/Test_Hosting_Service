const route = require("express").Router();
const { checkToken } = require("../middleware/checkToken.js");
const {
  getUsers,
  verifyEmail, //  api/mobile/users/   login
  resendOtp,
  logInUser,
  resetPassword,
  resetForgotPassword,
} = require("../controllers/users.js");

route.get("/", getUsers);
route.post("/verifyEmail", verifyEmail);
route.post("/resendOtp", resendOtp);
route.post("/login", logInUser);
route.patch("/resetPassword", checkToken, resetPassword);
route.patch("/resetForgotPassword", resetForgotPassword);




module.exports = route;
