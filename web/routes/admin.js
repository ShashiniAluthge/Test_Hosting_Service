const route = require("express").Router();
const {AdminLogin,AddAdmin,GetAccountInfo,ChangeUserName,ChangeContact,CheckPrePassword,ChangePassword,getRegCount} = require("../controllers/admin.js");
const auth = require("../middleware/auth.js")



route.post("/", AdminLogin);
route.post("/addAdmin", AddAdmin);
route.get("/getinfo",GetAccountInfo);
route.post("/changeUsername", ChangeUserName);
route.post("/changeContact", ChangeContact);
route.post("/CheckPrePassword", CheckPrePassword);
route.post("/ChangePassword", ChangePassword);
route.get("/regCount",getRegCount);




module.exports = route;
