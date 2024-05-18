const pool = require("../../config/dbConfig.js");

module.exports={
    CheckUsernamePassword: (username, callback) => {
        pool.query(
          `SELECT password From Admin WHERE FirstName=?`,
          [username],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
    AddAdmin: (username,password, callback) => {
        pool.query(
          `insert into Admin (FirstName,Password) values(?,?)`,
          [username,password],
          (error, result, feilds) => {
            if (error) {
                return callback(error);
            }
                return callback(null, result);
          }
        );
      },
}