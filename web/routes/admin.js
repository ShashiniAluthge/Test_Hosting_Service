const route = require("express").Router();
const {AdminLogin,AddAdmin} = require("../controllers/admin.js");



route.get("/:username", AdminLogin);

route.post("/addAdmin", AddAdmin);



module.exports = route;
