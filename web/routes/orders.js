const webOrderRouter = require ("express").Router();
const { getOrderDetailsById,
        CreateOrder,
        getOrderCounts,
        getPendingOrdersList,
        getCompleteOrderList,
        getInprogressOrderList,
        getPendingorderdetailsById,
        getCompleteOrderdetailsById,
        getinprogressOrderdetailsById
        }=require("../controllers/orders.js")
const { protect,allowRoles } = require('../middleware/auth.js')


webOrderRouter.get("/orderDetails/:orderId",getOrderDetailsById);
webOrderRouter.post("/",CreateOrder);
webOrderRouter.get("/orderCounts",getOrderCounts);
webOrderRouter.get("/pendingorderDetails",getPendingOrdersList);
webOrderRouter.get("/completeorderDetails",getCompleteOrderList);
webOrderRouter.get("/InprogressorderDetails",getInprogressOrderList);
webOrderRouter.get("/pendingorderdetailsbyid/:id", getPendingorderdetailsById);
webOrderRouter.get("/completeorderdetailsbyid/:id", getCompleteOrderdetailsById);
webOrderRouter.get("/inprogressorderdetailsbyid/:id", getinprogressOrderdetailsById);


module.exports = webOrderRouter; 