const webBranchuser = require ("express").Router();
const {getRegisterdpersonDetailsList,getRegisterdpersonDetailsById}=require("../controllers/branchuser.js")

webBranchuser.get("/RegisterdpersonDetails",getRegisterdpersonDetailsList);
webBranchuser.get("/RegisterdpersonDetailsbyid/:id",getRegisterdpersonDetailsById);

module.exports = webBranchuser; 