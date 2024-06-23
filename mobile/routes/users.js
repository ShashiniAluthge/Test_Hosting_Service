const route = require("express").Router();
const { checkToken } = require("../middleware/checkToken.js");
const {
  getUsers,
  verifyEmail, //  api/mobile/users/   login
  resendOtp,
  logInUser,
  resetPassword,
  resetForgotPassword,
  getProfileDetails,
  updateName,
  updateEmail,
  updateMobile,
  updateDob,
  verifyOtp,
  deleteOtp

} = require("../controllers/users.js");

route.get("/",checkToken,getUsers);
route.post("/verifyEmail", verifyEmail);
route.get("/resendOtp/:email", resendOtp);
route.post("/login", logInUser);
route.patch("/resetPassword",checkToken,resetPassword);
route.patch("/resetForgotPassword", resetForgotPassword);
route.get("/getProfileDetails/:user_id",getProfileDetails);
route.patch("/changeName/:user_id",updateName);
route.patch("/updateEmail/:user_id",updateEmail);
route.patch("/updateMobile/:user_id",updateMobile);
route.patch("/updateDob/:user_id",updateDob);
route.get("/verifyOtp/:email/:otp",verifyOtp);
route.delete("/deleteOtp/:email",deleteOtp);




module.exports = route;
