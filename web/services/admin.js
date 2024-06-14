const pool = require("../../config/dbConfig.js");
const admin = require("../controllers/admin.js");

module.exports={
    CheckUsernamePassword: (username, callback) => {
        pool.query(
          `SELECT password,admin_Id From Admin WHERE Email=?`,
          [username],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
    AddAdmin: (data, callback) => {
        pool.query(
          `insert into Admin (FirstName,Password,LastName,Tele,Email) values(?,?,?,?,?)`,
          [data.firstname,data.password,data.lastname,data.tele,data.username],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
      GetAccountInfo: (id, callback) => {
        pool.query(
          `select FirstName,LastName,Tele,Email from Admin  where (admin_Id = ?)`,
          [id],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
      ChangeUserName: (data, callback) => {
        pool.query(
          `Update Admin set FirstName=?,LastName=? where (admin_Id = ?)`,
          [data.fname,data.lname,data.adminID],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
      ChangeContact:(data, callback) => {
        pool.query(
          `Update Admin set Tele=?,Email=? where (admin_Id = ?)`,
          [data.tele,data.email,data.adminID],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
      CheckPrePassword:(id, callback) => {
        pool.query(
          `Select Password from Admin where (admin_Id = ?)`,
          [id],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
      ChangePassword:(data, callback) => {
        pool.query(
          `Update Admin set Password=? where (admin_Id = ?)`,
          [data.newPassword,data.adminID],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
      
}