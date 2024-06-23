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
  getOrderStateCount,
  getOnDiliveryOrders,
  updateOnDiliveryState,
  getCompletedOrders,
  getPerformanceDetails
} = require("../controllers/orders");
const {checkToken} = require("../middleware/checkToken");

orderRoute.get("/getOnDiliveryOrders/:user_id",checkToken,getOnDiliveryOrders);
orderRoute.get("/getCompletedOrders/:userId",checkToken,getCompletedOrders)
orderRoute.get("/:branchLocation",checkToken,getPendingOrders);
orderRoute.post("/updatePendingState/:order_id/:user_id",updatePendingState);
orderRoute.get("/getOrderDetails/:order_id",checkToken,getOrderDetails);
orderRoute.get("/getToDoOrders/:branchLocation/:user_id",checkToken,getToDoOrderList);
orderRoute.patch("/cancelToDoOrder/:order_id",checkToken,cancelToDoOrder);
orderRoute.get("/getOrderTypeCost/:order_id",checkToken,getOrderTypeCost);
orderRoute.patch("/updateWeightCost/:order_id",checkToken,updateWeightCost);
orderRoute.get("/getPriceDetails/:order_id",checkToken,getPriceDetails);
orderRoute.get("/getOrderStateCount/:user_id/:branchLocation",checkToken,getOrderStateCount);
orderRoute.patch("/updateOnDiliveryState/:order_id",checkToken,updateOnDiliveryState);
orderRoute.get("/getPerformanceDetails/:branchLocation",getPerformanceDetails);







module.exports = orderRoute;
