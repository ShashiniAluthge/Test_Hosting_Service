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
  storeOtpInTable:(email,result,callback)=>{
    pool.query('UPDATE Otp SET Otp=?,Expires_at=? WHERE Email = ?',
    [result[1],new Date(result[0]),email],(error,result,feilds)=>{
      if(error){
        return callback(error)
      }
      return callback(null,result);
    })
  },
  verifyOtp:(email,callback)=>{
    pool.query(`SELECT Otp,Expires_at FROM Otp WHERE Email=?`,[email],(error,result)=>{
      if(error){
        return callback(error)
      }
      return callback(null,result);
    })
  },
  deleteOtp:(email,callback)=>{
    pool.query(`UPDATE Otp SET Otp=NULL,Expires_at=NULL WHERE Email=?`,[email],(error,result,feilds)=>{
      if(error){
        return callback(error)
      }else{
        return callback(null,result);
      }
    })
  }
};
