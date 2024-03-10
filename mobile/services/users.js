const pool = require("../../config/dbConfig.js");

module.exports = {
  logInUserbyName: (name, callback) => {
    pool.query(
      `SELECT BranchUser_id,FirstName,Password,NewUser,branchLocation From BranchUser WHERE FirstName=?`,
      [name],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  resetNewPassword: (name, password, callback) => {
    pool.query(
      `UPDATE BranchUser SET Password=?,NewUser=? WHERE FirstName=?`,
      [password, "F", name],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  verifyEmail: (name, callback) => {
    pool.query(
      `SELECT Email FROM BranchUser WHERE FirstName=?`,
      [name],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getUsers: (callback) => {
    pool.query(`SELECT * FROM BranchUser`, [], (error, result, feilds) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  },
};
