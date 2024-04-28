const orderRoute = require("express").Router();
const {
  getPendingOrders,
  updatePendingState,
  getOrderDetails,
  getToDoOrderList,
  cancelToDoOrder,
  getOrderTypeCost,
  updateWeightCost,
  getPriceDetails,
  getOrderStateCount
} = require("../controllers/orders");

orderRoute.get("/:branchLocation", getPendingOrders);
orderRoute.post("/updatePendingState/:branchLocation", updatePendingState);
orderRoute.get("/getOrderDetails/:order_id",getOrderDetails);
orderRoute.get("/getToDoOrders/:branchLocation/:user_id",getToDoOrderList);
orderRoute.patch("/cancelToDoOrder/:order_id",cancelToDoOrder);
orderRoute.get("/getOrderTypeCost/:order_id",getOrderTypeCost);
orderRoute.patch("/updateWeightCost/:order_id",updateWeightCost);
orderRoute.get("/getPriceDetails/:order_id",getPriceDetails)
orderRoute.get("/getOrderStateCount/:user_id/:branchLocation",getOrderStateCount)



module.exports = orderRoute;
