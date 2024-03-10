const { getPendingOrders, updatePendingState } = require("../services/orders");

module.exports = {
  getPendingOrders: (req, res) => {
    let branchLocation = req.params.branchLocation;
    getPendingOrders(branchLocation, (error, results) => {
      if (error) {
        return res.json({
          success: 0,
          message: error.message,
        });
      }
      if (results.length == 0) {
        return res.json({
          success: 100,
          message: "No pending orders",
        });
      }
      if (results) {
        return res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  updatePendingState: (req, res) => {
    order_id = Number(req.params.branchLocation);
    console.log(typeof order_id);
    user_id = Number(req.body.user_id);
    console.log(typeof user_id);
    updatePendingState(order_id, user_id, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      }
      if (result) {
        return res.json({
          success: 0,
          message: result,
        });
      }
    });
  },
};
