const orderRoute = require("express").Router();
const {
  getPendingOrders,
  updatePendingState,
} = require("../controllers/orders");

orderRoute.get("/:branchLocation", getPendingOrders);
orderRoute.post("/updatePendingState/:branchLocation", updatePendingState);

module.exports = orderRoute;
