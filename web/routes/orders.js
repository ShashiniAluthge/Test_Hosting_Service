const webOrderRouter = require ("express").Router();
const {getOrderDetailsById}=require("../controllers/orders.js")

webOrderRouter.get("/orderDetails/:orderId",getOrderDetailsById);

module.exports = webOrderRouter; 