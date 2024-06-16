
const pool = require("../../config/dbConfig.js");
module.exports = {
  getOrderDetailsById: (id, callBack) => {
    pool.query(
      `SELECT Emmergency,Total_Cost,Weight_Cost,branchLocation,Pickup_StreetNo,Pickup_Street,Pickup_City,Status,FirstName,LastName,mobile,StreetNo,Street,City
        FROM Orders,Reciever,RecieverMobile
        WHERE Reciever.recieverId=Orders.recieverId AND Reciever.recieverId=RecieverMobile.recieverId AND Orders.Order_id = ?`,
      [id],
      (error, results, feilds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  SenderTable: (data) => {
   
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Customer (FirstName,LastName,StreetNo,Street,City) values(?,?,?,?,?)`,
        [data.sfname, data.slname, data.sstreetNo, data.sstreet, data.scity],
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  RecieverTable: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Reciever (FirstName,LastName,DiliveryProvince,DiliveryDistrict,StreetNo,Street,City) values(?,?,?,?,?,?,?)`,
        [
          data.rfname,
          data.rlname,
          data.rprovince,
          data.rdistric,
          data.rstreetNo,
          data.rstreet,
          data.rhometown,
        ],

        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  OrderTable: (data, rid, sid) => {
    if (data.pimergency === "Immergency") {
      data.pimergency = "T";
    } else {
      data.pimergency = "F";
    }
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Orders (Pickup_District,Pickup_StreetNo,Pickup_Street,Pickup_City,Status,Emmergency,branchLocation,Distance_Cost,admin_Id,recieverId,cus_id) values(?,?,?,?,?,?,?,?,?,?,?)`,
        [
          data.pdistrict,
          data.pstreetNo,
          data.pstreet,
          data.phometown,
          "PENDING",
          data.pimergency,
          data.pbranch,
          data.pdistancecost,
          data.padminID,
          rid,
          sid,
        ],
        (error, results, feilds) => {
          if (error) {
            console.log(error)
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  GetsenderID: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT max(cus_id) as sID FROM Customer `,
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results[0].sID);
        }
      );
    });
  },
  GetRecieverID: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT max(recieverId) as rID FROM Reciever `,
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results[0].rID);
        }
      );
    });
  },
  SenderTele: (rid,tele) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into CustomerMobile (cus_id,mobile) values(?,?)`,
        [rid,tele],
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  RecieverTele: (sid,tele) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into RecieverMobile (recieverId,mobile) values(?,?)`,
        [sid,tele],
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
};
