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
  deleteOtp,
  uploadImage,
  deleteImage
} = require("../controllers/users.js");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


route.get("/",checkToken,getUsers);
route.post("/verifyEmail", verifyEmail);
route.get("/resendOtp/:email", resendOtp);
route.post("/login", logInUser);
route.patch("/resetPassword",checkToken,resetPassword);
route.patch("/resetForgotPassword", resetForgotPassword);
route.get("/getProfileDetails/:user_id",checkToken,getProfileDetails);
route.patch("/changeName/:user_id",updateName);
route.patch("/updateEmail/:user_id",updateEmail);
route.patch("/updateMobile/:user_id",updateMobile);
route.patch("/updateDob/:user_id",updateDob);
route.get("/verifyOtp/:email/:otp",verifyOtp);
route.delete("/deleteOtp/:email",deleteOtp);
route.post("/uploadImage/:user_id",checkToken,upload.single('myimage'),uploadImage);
route.delete("/deleteImage/:user_id",checkToken,deleteImage)





module.exports = route;
