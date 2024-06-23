const route = require("express").Router();
const {AdminLogin,AddAdmin,GetAccountInfo,ChangeUserName,ChangeContact,CheckPrePassword,ChangePassword,getRegCount,getAdminprofileDetails,getAdminprofileDetailsById} = require("../controllers/admin.js");
const auth = require("../middleware/auth.js")



route.post("/", AdminLogin);
route.post("/addAdmin", AddAdmin);
route.get("/getinfo",GetAccountInfo);
route.post("/changeUsername", ChangeUserName);
route.post("/changeContact", ChangeContact);
route.post("/CheckPrePassword", CheckPrePassword);
route.post("/ChangePassword", ChangePassword);
route.get("/regCount",getRegCount);
route.get("/AdminprofileDetails",getAdminprofileDetails);
route.get("/AdminprofileDetailsById/:id",getAdminprofileDetailsById);




module.exports = route;
