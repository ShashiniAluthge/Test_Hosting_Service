const pool = require("../../config/dbConfig.js");

module.exports = {
  getPendingOrders: (brancLocation, callback) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Emmergency,DiliveryDistrict,DiliveryProvince,orderPlaceDate
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
    // i have used SELECT.....FOR UPDATE as exclusive lock to prevent updating same order at same time 
    //multiple request. i have to check whether it is working
    pool.query(
      `SELECT * FROM Orders WHERE Order_id=? FOR UPDATE`,
      [order_id],
      (error,result,feilds)=>{
        if(error){
          return callback;
        }if(result){
          pool.query(`UPDATE Orders SET Status='ONPICK',BranchUser_id=? WHERE Order_id=? AND Status=?`,
            [user_id,order_id,'PENDING'],
            (error,result,feilds)=>{
              if(error){
                return callback(error)
              }
              return callback(null,result)
            }
          )
        }
      }
    )
    // pool.query(
    //   `UPDATE Orders SET Status='ONPICK',BranchUser_id=? WHERE Order_id=?`,
    //   [user_id, order_id],
    //   (error, result, feilds) => {
    //     if (error) {
    //       return callback(error);
    //     }
    //     return callback(null, result);
    //   }
    // );
  },
  getOrderDetails: (order_id, callback) => {
    pool.query(
      `SELECT c.FirstName AS FN,c.LastName AS LN,cm.mobile AS M,o.Pickup_District,o.Pickup_StreetNo,o.Pickup_Street,o.Pickup_City,o.orderPlaceDate,r.FirstName,r.LastName,r.DiliveryDistrict,r.StreetNo,r.Street,r.City,rm.mobile
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
      `SELECT Order_id,Pickup_District,Emmergency,DiliveryDistrict,DiliveryProvince,orderPlaceDate 
    FROM Orders o,Reciever r
    WHERE o.recieverId=r.recieverId AND
    branchLocation=? AND
    BranchUser_id=? AND
    Status=?`,
      [brancLocation, order_id, "ONPICK"],
      (error, result, feild) => {
        if (error) {
          return callback(error);
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
  updateWeightCost: (date, time, order_id, weight, weightCost, callback) => {
    pool.query(
      `UPDATE Orders
    SET Weight_Cost=?,pickup_Date=?,pickup_Time=?,
    Total_Cost=Distance_Cost+?,weight=?
    WHERE Order_id=?`,
      [weightCost, date, time, weightCost, weight, order_id],
      (error, result, feilds) => {
        if (error) {
          console.log(error)
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
      ["ONDILIVERY", order_id],
      (error, result, feilds) => {
        if (error) {
          console.log(error);
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
           return reject(error);
          }
         return resolve(result);
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
            return reject(error);
          }
          return resolve(result);
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
           return reject(error);
          }
          return resolve(result);
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
           return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },
  getVerifyPickedOrders: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(Order_id) AS verifyPickCount
        FROM Orders
        WHERE BranchUser_id=? AND Status=?`,
        [user_id, "VERIFYPICKED"],
        (error, result, feilds) => {
          if (error) {
           return reject(error);
          }
         return resolve(result);
        }
      );
    });
  },
  getVerifyDiliveryOrders: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(Order_id) AS verifyDiliveryCount
        FROM Orders
        WHERE BranchUser_id=? AND Status=?`,
        [user_id, "VERIFYDILIVERY"],
        (error, result, feilds) => {
          if (error) {
           return reject(error);
          }
         return resolve(result);
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
        AND (o.Status='ONPICK' OR o.Status='ONDILIVERY')
        GROUP BY (DiliveryProvince)`,
        [user_id],
        (error, result, feilds) => {
          if (error) {
           return reject(error);
          }
         return resolve(result);
        }
      );
    });
  },
  getOnDiliveryOrders: (user_id, callback) => {
    pool.query(
      `SELECT Order_id,Emmergency,Pickup_District,DiliveryDistrict,pickup_Date,DiliveryProvince
       FROM Orders o , Reciever r  
       WHERE o.recieverId=r.recieverId AND Status='ONDILIVERY' AND o.BranchUser_id=?`,
      [user_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  updateOnDiliveryState: (order_id,diliveryDate,diliveryTime,callback) => {
    pool.query(
      `UPDATE Orders
       SET Status = 'DILIVERED',dilivery_Date=?,dilivery_Time=?
       WHERE Order_id=?`,
      [diliveryDate,diliveryTime,order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  updateBranchUserEarnings:(user_id,totalCost,callback)=>{
    pool.query(`UPDATE BranchUser SET totalEarnings=totalEarnings+? WHERE BranchUser_id=?`,
      [totalCost,user_id],
      (error,result,feilds)=>{
        if(error){
          return callback(error)
        }
        return callback(null,result)
      }
    )
  },
  getCompletedOrders: (userId, callback) => {
    console.log(userId);
    pool.query(
      `SELECT Order_id,Emmergency,Pickup_District,DiliveryDistrict,Total_Cost,dilivery_Date
       FROM Orders o , Reciever r
       WHERE o.recieverId=r.recieverid AND Status='DILIVERED' AND BranchUser_id=?`,
      [userId],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getPerformanceDetails: (branchLocation, callback) => {
    pool.query(
      `SELECT BranchUser.BranchUser_id,FirstName,totalEarnings,COUNT(Status) AS CompletedOrders
      FROM BranchUser,Orders
      WHERE BranchUser.BranchUser_id=Orders.BranchUser_id
      AND Orders.Status='DILIVERED' AND Orders.branchLocation=?
      GROUP BY(BranchUser.BranchUser_id)
      ORDER BY(CompletedOrders)`,
      [branchLocation],
      (error, result, feild) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getDataForTodoMail: (order_id, callback) => {
    pool.query(
      `SELECT O.Order_id,B.FirstName AS BranchUserName,BM.Mobile,R.FirstName AS RecieverName,C.FirstName AS CustomerName,O.weight,O.distance,O.Total_Cost,
      O.Distance_Cost,O.Weight_Cost,O.pickup_Date,O.pickup_Time,C.Email AS CustomerEmail,R.Email AS RecieverEmail,O.dilivery_Date,O.dilivery_Time
      FROM Orders O,BranchUser B,BranchUserMobile BM,Reciever R,Customer C
      WHERE O.BranchUser_id=B.BranchUser_id AND BM.BranchUser_id=B.BranchUser_id AND O.recieverId=R.recieverId AND O.cus_id=C.cus_id AND O.Order_id=?`,
      [order_id],
      (error, result, feild) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
};
