const {
  sendOrderPickUpMail,
  sendDiliveryMail,
} = require("../modules/sendingEmail");
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
  getOnDiliveryOrders,
  updateOnDiliveryState,
  getCompletedOrders,
  getPerformanceDetails,
  getDataForTodoMail,
  updateBranchUserEarnings,
} = require("../services/orders");

module.exports = {
  getPendingOrders: (req, res) => {
    let branchLocation = req.params.branchLocation;
    getPendingOrders(branchLocation, (error, results) => {
      if (error) {
        console.log(`The error is located at getPendingOrder ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      }
      if (results.length == 0) {
        return res.json({
          success: 101,
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
    order_id = Number(req.params.order_id);
    user_id = Number(req.params.user_id);
    updatePendingState(order_id, user_id, (error, result) => {
      if (error) {
        console.log(`Error is at updatePendingState ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      }
      if (result.affectedRows > 0) {
        return res.json({
          success: 200,
          message: "successfully updated",
        });
      } else {
        return res.json({
          success: 101,
          message: "status doesnot change successfully",
        });
      }
    });
  },
  getOrderDetails: (req, res) => {
    order_id = Number(req.params.order_id);
    getOrderDetails(order_id, (error, result) => {
      if (error) {
        console.log(`Error is getOrderDetails ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      }
      if (result.length > 0) {
        return res.json({
          success: 200,
          message: result,
        });
      } else {
        return res.json({
          success: 101,
          message: "No Order Found",
        });
      }
    });
  },
  getToDoOrderList: (req, res) => {
    const branchLocation = req.params.branchLocation;
    const user_id = Number(req.params.user_id);
    getToDoOrderList(branchLocation, user_id, (error, result) => {
      if (error) {
        console.log(`error is at getTodoOrderList${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result) {
        if (result.length == 0) {
          return res.json({
            success: 101,
            message: "no orders to do",
          });
        } else {
          return res.json({
            success: 200,
            message: result,
          });
        }
      } else {
        console.log("im here too");
        return res.json({
          success: 101,
          message: "Request Failed.Try Again!",
        });
      }
    });
  },
  cancelToDoOrder: (req, res) => {
    order_id = Number(req.params.order_id);
    cancelToDoOrder(order_id, (error, result) => {
      if (error) {
        console.log(`error is at cancelToDoOrder${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.affectedRows > 0) {
        return res.json({
          success: 200,
          message: result,
        });
      } else {
        return res.json({
          success: 101,
          message: "Cannot cancel this order",
        });
      }
    });
  },
  getOrderTypeCost: (req, res) => {
    const { order_id } = req.params;
    getOrderTypeCost(order_id, (error, result) => {
      if (error) {
        console.log(`error is at getOrderTypeCost${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.length > 0) {
        return res.json({
          success: 200,
          message: result,
        });
      } else {
        return res.json({
          success: 101,
          message: "Order details not found",
        });
      }
    });
  },
  updateWeightCost: (req, res) => {
    const order_id = Number(req.params.order_id);
    const weight = parseFloat(req.body.weight);
    const weightCost = parseFloat(req.body.weightCost);
    const date = `${new Date().getFullYear().toString()}-${(
      new Date().getMonth() + 1
    ).toString()}-${new Date().getDate().toString()}`;
    const time = `${new Date().getHours().toString()}:${new Date()
      .getMinutes()
      .toString()}`;
    updateWeightCost(
      date,
      time,
      order_id,
      weight,
      weightCost,
      (error, result) => {
        if (error) {
          console.log(`error is at updateWeightCost: ${error}`);
          return res.json({
            success: 0,
            message: "Internal Server Error",
          });
        } else if (result.affectedRows > 0) {
          updateOnPickState(order_id, (error, result) => {
            if (error) {
              console.log(`error is at updateOnPickState: ${error}`);
              return res.json({
                success: 0,
                message: "Internal Server Error",
              });
            } else if (result.affectedRows > 0) {
              getDataForTodoMail(order_id, (error, result) => {
                if (error) {
                  console.log(`error is at getDataForTodoMail: ${error}`);
                  return res.json({
                    success: 0,
                    message: "Internal Server Error",
                  });
                } else if (result.length > 0) {
                  console.log("Email is sending............");
                  const {
                    Order_id,
                    BranchUserName,
                    Mobile,
                    RecieverName,
                    CustomerName,
                    weight,
                    distance,
                    Total_Cost,
                    Distance_Cost,
                    Weight_Cost,
                    pickup_Date,
                    pickup_Time,
                    CustomerEmail,
                    RecieverEmail,
                    dilivery_Date,
                    dilivery_Time,
                  } = result[0];
                  const mailInfo = {
                    Order_id,
                    BranchUserName,
                    Mobile,
                    RecieverName,
                    CustomerName,
                    weight,
                    distance,
                    Total_Cost,
                    Distance_Cost,
                    Weight_Cost,
                    pickup_Date,
                    pickup_Time,
                    CustomerEmail,
                    RecieverEmail,
                  };
                  sendOrderPickUpMail(mailInfo, (error, result) => {
                    if (error) {
                      console.log(`error is at sendOrderPickUpMail: ${error}`);
                      return res.json({
                        success: 0,
                        message: "Internal Server Error",
                      });
                    } else if (
                      result.accepted.includes(mailInfo.RecieverEmail) &&
                      result.response.includes("250 2.0.0 OK")
                    ) {
                      return res.json({
                        success: 200,
                        message: "Email sent successfully!",
                      });
                    } else {
                      res.json({
                        success: 101,
                        message: "Customer Email Not Sucessfull",
                      });
                    }
                  });
                } else {
                  res.json({
                    success: 101,
                    message: "No Customer Reciver Data Found",
                  });
                }
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
      }
    );
  },
  getPriceDetails: (req, res) => {
    const order_id = Number(req.params.order_id);
    console.log(order_id);
    getPriceDetails(order_id, (error, result) => {
      if (error) {
        console.log(`error is at getPriceDetails: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
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
      if (selectedCount[0].selectedCount > 0) {
        selectedProvince = await getSelectedProvince(user_id);
      } else if (onGoingCount[0].onGoingCount > 0) {
        selectedProvince = await getSelectedProvince(user_id);
      } else {
        selectedProvince = [{ DiliveryProvince: "NPS" }]; //No Province Selected
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
      console.log(error);
      return res.json({
        success: 0,
        message: "Internal Server Error",
      });
    }

    //i have to search how to getorder status by completing all asynchronous method

    //what i have learnt so far
    //i can write this in a callback hell
    //normally i think when promise is used it will execute other functions only after getting the result of asynchronous function
    //then if we use await and async it will execute other operations mean while the asynchronous operation executed
    // so normally i think async and await is used when calling the promises.all the operations in the promise is hide by await keyword
  },
  getOnDiliveryOrders: (req, res) => {
    const user_id = req.params.user_id;
    getOnDiliveryOrders(user_id, (error, result) => {
      if (error) {
        console.log(`error is at getOnDiliveryOrders: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      }
      if (result) {
        if (result.length == 0) {
          return res.json({
            success: 101,
            message: "no orders found",
          });
        } else {
          return res.json({
            success: 200,
            message: result,
          });
        }
      } else {
        return res.json({
          success: 101,
          message: "something went wrong",
        });
      }
    });
  },
  updateOnDiliveryState: (req, res) => {
    const order_id = req.params.order_id;
    const user_id = req.params.user_id;
    const diliveryDate = `${new Date().getFullYear().toString()}-${(
      new Date().getMonth() + 1
    ).toString()}-${new Date().getDate().toString()}`;
    const diliveryTime = `${new Date().getHours().toString()}:${new Date()
      .getMinutes()
      .toString()}:${new Date().getSeconds().toString()}`;
    updateOnDiliveryState(
      order_id,
      diliveryDate,
      diliveryTime,
      (error, result) => {
        if (error) {
          console.log(`error is at updateOnDiliveryState: ${error}`);
          return res.json({
            success: 0,
            message: "Internal Server Error",
          });
        } else if (result.affectedRows > 0) {
          getDataForTodoMail(order_id, (error, result) => {
            if (error) {
              console.log(`error is at getDataForTodoMail: ${error}`);
              return res.json({
                success: 0,
                message: "Internal Server Error",
              });
            } else if (result.length > 0) {
              const {
                Order_id,
                BranchUserName,
                Mobile,
                RecieverName,
                CustomerName,
                weight,
                distance,
                Total_Cost,
                Distance_Cost,
                Weight_Cost,
                pickup_Date,
                pickup_Time,
                CustomerEmail,
                RecieverEmail,
                dilivery_Date,
                dilivery_Time,
              } = result[0];
              const mailInfo = {
                Order_id,
                BranchUserName,
                Mobile,
                RecieverName,
                CustomerName,
                weight,
                distance,
                Total_Cost,
                Distance_Cost,
                Weight_Cost,
                pickup_Date,
                pickup_Time,
                CustomerEmail,
                RecieverEmail,
                dilivery_Date,
                dilivery_Time,
              };
              updateBranchUserEarnings(user_id, Total_Cost, (error, result) => {
                if (error) {
                  console.log(`error is at updateBranchUserEarnings: ${error}`);
                  return res.json({
                    success: 0,
                    message: "Internal Server Error",
                  });
                } else if (result.affectedRows > 0) {
                  sendDiliveryMail(mailInfo, (error, result) => {
                    if (error) {
                      console.log(`error is at sendDiliveryMail: ${error}`);
                      return res.json({
                        success: 0,
                        message: "Internal Server Error",
                      });
                    } else if (
                      result.accepted.includes(mailInfo.RecieverEmail) &&
                      result.response.includes("250 2.0.0 OK")
                    ) {
                      return res.json({
                        success: 200,
                        message: "Email sent successfully!",
                      });
                    } else {
                      res.json({
                        success: 101,
                        message: "Customer Email Not Sucessfull",
                      });
                    }
                  });
                } else {
                  return res.json({
                    success: 101,
                    message: "Price update unsuccessful",
                  });
                }
              });
            } else {
              return res.json({
                success: 101,
                message: "no customer found",
              });
            }
          });
        } else {
          return res.json({
            success: 101,
            message: "status doesn't change successfully",
          });
        }
      }
    );
  },
  getCompletedOrders: (req, res) => {
    const user_id = req.params.userId;
    getCompletedOrders(user_id, (error, result) => {
      //console.log(result);
      if (error) {
        console.log(`error is at getCompletedOrders: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      }
      else if(result){
        if (result.length == 0) {
          return res.json({
            success: 101,
            message: "Orders not found",
          });
        } else {
          return res.json({
            success: 200,
            message: result,
          });
        } 
      }else{
        return res.json({
          success: 100,
          message: 'Try Again',
        });
      }
    });
  },
  getPerformanceDetails: (req, res) => {
    const branchLocation = req.params.branchLocation;
    console.log(branchLocation);
    getPerformanceDetails(branchLocation, (error, result) => {
      if (error) {
        console.log(`error is at getPerformanceDetails: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.length == 0) {
        res.json({
          success: 101,
          message: "No details to show",
        });
      } else if (result.length > 0) {
        res.json({
          success: 200,
          message: result,
        });
      } else {
        res.json({
          success: 101,
          message: "something went wrong",
        });
      }
    });
  },
};
