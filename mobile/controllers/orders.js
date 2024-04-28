const {
  getPendingOrders,
  updatePendingState,
  getOrderDetails,
  getToDoOrderList,
  cancelToDoOrder,
  getOrderTypeCost,
  updateWeightCost,
  updateOnPickState,
  getPriceDetails,
  getNoOfPendingOrders,
  getNoOfSelectedOrders,
  getNoOfCompletedOrders,
  getNoOfOnGoingOrders,
  getSelectedProvince,
} = require("../services/orders");

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
  getOrderDetails: (req, res) => {
    order_id = Number(req.params.order_id);

    getOrderDetails(order_id, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      }
      if (result) {
        return res.json({
          success: 200,
          message: result,
        });
      }
    });
  },
  getToDoOrderList: (req, res) => {
    const branchLocation = req.params.branchLocation;
    const user_id = Number(req.params.user_id);
    getToDoOrderList(branchLocation, user_id, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      } else if (result.length == 0) {
        return res.json({
          success: 101,
          message: "no orders to do",
        });
      } else if (result) {
        return res.json({
          success: 200,
          message: result,
        });
      } else {
        return res.json({
          success: 201,
          message: "unhandled error",
        });
      }
    });
  },
  cancelToDoOrder: (req, res) => {
    order_id = Number(req.params.order_id);
    cancelToDoOrder(order_id, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      }
      if (result) {
        return res.json({
          success: 200,
          message: result,
        });
      }
    });
  },
  getOrderTypeCost: (req, res) => {
    const { order_id } = req.params;
    getOrderTypeCost(order_id, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      }
      if (result) {
        return res.json({
          success: 200,
          message: result,
        });
      }
    });
  },
  updateWeightCost: (req, res) => {
    const order_id = Number(req.params.order_id);
    const weightCost = parseFloat(req.body.weightCost);
    updateWeightCost(order_id, weightCost, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      } else if (result.affectedRows > 0) {
        updateOnPickState(order_id, (error, result) => {
          if (error) {
            return res.json({
              success: 0,
              message: error,
            });
          } else if (result.affectedRows > 0) {
            return res.json({
              success: 200,
              message: "status change successfully",
            });
          } else {
            return res.json({
              success: 101,
              message: "status doesn't change successfully",
            });
          }
        });
      } else {
        return res.json({
          success: 100,
          message: "price doesn't updated successfully",
        });
      }
    });
  },
  getPriceDetails: (req, res) => {
    const order_id = Number(req.params.order_id);
    console.log(order_id);
    getPriceDetails(order_id, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      } else if (result.length == 0) {
        return res.json({
          success: 101,
          message: "no order found",
        });
      } else if (result) {
        return res.json({
          success: 200,
          message: result,
        });
      }
    });
  },
  getOrderStateCount: async (req, res) => {
    const user_id = req.params.user_id;
    const branchLocation = req.params.branchLocation;
    let selectedProvince = "null";
    try {
      const pendingCount = await getNoOfPendingOrders(branchLocation);
      const selectedCount = await getNoOfSelectedOrders(user_id);
      const onGoingCount = await getNoOfOnGoingOrders(user_id);
      const completedCount = await getNoOfCompletedOrders(user_id);
      if (
        selectedCount[0].selectedCount > 0 ||
        onGoingCount[0].onGoingCount > 0
      ) {
        selectedProvince = await getSelectedProvince(user_id);
      } else {
        selectedProvince = [{ DiliveryProvince: "NPS" }];
      }
      console.log(
        pendingCount,
        selectedCount,
        onGoingCount,
        completedCount,
        selectedProvince
      );
      return res.json({
        success: 200,
        message: [
          pendingCount,
          selectedCount,
          onGoingCount,
          completedCount,
          selectedProvince,
        ],
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: error,
      });
    }

    //i have to search how to getorder status by completing all asynchronous method

    //what i have learnt so far
    //i can write this in a callback hell
    //normally i think when promise is used it will execute other functions only after getting the result of asynchronous function
    //then if we use await and async it will execute other operations mean while the asynchronous operation executed
    // so normally i think async and await is used when calling the promises.all the operations in the promise is hide by await keyword
  },
};
