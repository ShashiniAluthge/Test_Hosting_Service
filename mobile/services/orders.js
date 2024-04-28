const pool = require("../../config/dbConfig.js");

module.exports = {
  getPendingOrders: (brancLocation, callback) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Emmergency,DiliveryDistrict,DiliveryProvince
        FROM Orders o,Reciever r
        WHERE o.recieverId=r.recieverId AND
        branchLocation=? AND
        Status=?`,
      [brancLocation, "PENDING"],
      (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  updatePendingState: (order_id, user_id, callback) => {
    pool.query(
      `UPDATE Orders SET Status='ONPICK',BranchUser_id=? WHERE Order_id=?`,
      [user_id, order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getOrderDetails: (order_id, callback) => {
    pool.query(
      `SELECT c.FirstName AS FN,c.LastName AS LN,cm.mobile AS M,o.Pickup_District,o.Pickup_StreetNo,o.Pickup_Street,o.Pickup_City,r.FirstName,r.LastName,r.DiliveryDistrict,r.StreetNo,r.Street,r.City,rm.mobile
       FROM Customer c , CustomerMobile cm , Orders o, Reciever r, RecieverMobile rm
       WHERE o.recieverId=r.recieverid AND r.recieverid=rm.recieverid AND o.cus_id=c.cus_id AND c.cus_id=cm.cus_id AND o.Order_Id=?`,
      [order_id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getToDoOrderList: (brancLocation, order_id, callback) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Emmergency,DiliveryDistrict,DiliveryProvince 
    FROM Orders o,Reciever r
    WHERE o.recieverId=r.recieverId AND
    branchLocation=? AND
    BranchUser_id=? AND
    Status=?`,
      [brancLocation, order_id, "ONPICK"],
      (error, result, feild) => {
        if (error) {
          callback(error);
        }
        return callback(null, result);
      }
    );
  },
  cancelToDoOrder: (order_id, callback) => {
    pool.query(
      `UPDATE Orders 
    SET Status=?,BranchUser_id=NULL
    WHERE Order_id=?`,
      ["PENDING", order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getOrderTypeCost: (order_id, callback) => {
    pool.query(
      `SELECT Emmergency,Distance_Cost
    FROM  Orders
    WHERE Order_id=?`,
      [order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  updateWeightCost: (order_id, weightCost, callback) => {
    pool.query(
      `UPDATE Orders
    SET Weight_Cost=?,
    Total_Cost=Distance_Cost+? 
    WHERE Order_id=?`,
      [weightCost, weightCost, order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  updateOnPickState: (order_id, callback) => {
    pool.query(
      `UPDATE Orders
    SET Status=?
    WHERE Order_id=?`,
      ["VERIFYPICKED", order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getPriceDetails: (order_id, callback) => {
    pool.query(
      `
    SELECT Distance_Cost,Weight_Cost,Total_Cost
    FROM Orders
    WHERE Order_id=?
    `,
      [order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getNoOfPendingOrders: (barnchLocation) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(Order_id) AS pendingCount
        FROM Orders
        WHERE branchLocation=? AND Status=?
        `,
        [barnchLocation, "PENDING"],
        (error, result, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  getNoOfSelectedOrders: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(Order_id) AS selectedCount
        FROM Orders
        WHERE BranchUser_id=? AND Status=?`,
        [user_id, "ONPICK"],
        (error, result, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  getNoOfOnGoingOrders: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(Order_id) AS onGoingCount
        FROM Orders
        WHERE BranchUser_id=? AND Status=?`,
        [user_id, "ONDILIVERY"],
        (error, result, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  getNoOfCompletedOrders: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(Order_id) AS completedCount
        FROM Orders
        WHERE BranchUser_id=? AND Status=?`,
        [user_id, "DILIVERED"],
        (error, result, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  getSelectedProvince: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT DiliveryProvince
        FROM Reciever r, Orders o
        WHERE o.recieverId=r.recieverId 
        AND o.BranchUser_id=? 
        AND (o.Status='ONPICK' OR o.Status='VERIFYPICKED')
        GROUP BY (DiliveryProvince)`,
        [user_id],
        (error, result, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(result);;
        }
      );
    });
  },
};
