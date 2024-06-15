const webOrderRouter = require ("express").Router();
const { getOrderDetailsById,
        CreateOrder,
        getOrderCounts}=require("../controllers/orders.js")

webOrderRouter.get("/orderDetails/:orderId",getOrderDetailsById);
webOrderRouter.post("/",CreateOrder);
webOrderRouter.get("/orderCounts",getOrderCounts);

module.exports = webOrderRouter; 