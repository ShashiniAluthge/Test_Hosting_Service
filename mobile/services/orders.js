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
      `UPDATE Orders SET Status='PICKED',BranchUser_id=? WHERE Order_id=?`,
      [user_id, order_id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
};
