const pool = require("../../config/dbConfig");

module.exports = {
  logInUserbyName: (name, callback) => {
    pool.query(
      `SELECT name,password,newUser From userdetails WHERE name=?`,
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
      `UPDATE userdetails SET password=?,newUser=? WHERE name=?`,
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
      `SELECT email FROM userdetails WHERE name=?`,
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
    pool.query(`SELECT * FROM userdetails`, [], (error, result, feilds) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  },
};
