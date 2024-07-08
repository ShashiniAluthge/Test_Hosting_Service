const pool = require("../../config/dbConfig.js");
const { updateDob, deleteImage } = require("../controllers/users.js");

module.exports = {
  logInUserbyName: (name, callback) => {
    pool.query(
      `SELECT BranchUser_id,FirstName,Password,NewUser,branchLocation,profileImageUrl From BranchUser WHERE FirstName=?`,
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
  getProfileDetails: (user_id, callback) => {
    pool.query(
      `SELECT b.FirstName,b.LastName,b.StreetNo,b.Street,b.City,b.Email,bm.Mobile,b.DOB,b.profileImageUrl
       FROM BranchUser b, BranchUserMobile bm
       WHERE b.BranchUser_id=bm.BranchUser_id AND b.BranchUser_id = ?`,
      [user_id],
      (error, result,feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  updateName:(firstName,lastName,user_id,callback)=>{
    pool.query(`UPDATE BranchUser SET FirstName=?,LastName=? WHERE BranchUser_id=?`,[firstName,lastName,user_id],
      (error,result,feilds)=>{
        if(error){
          return callback(error)
        }
        return callback(null,result);
      }
    )
  },
  updateEmail:(email,user_id,callback)=>{
    pool.query(`UPDATE BranchUser SET Email=? WHERE BranchUser_id=?`,[email,user_id],
      (error,result,feilds)=>{
        if(error){
          return callback(error)
        }
        return callback(null,result)
        
      }
    )
  },
  updateMobile:(mobile,user_id,callback)=>{
    pool.query(
      `UPDATE BranchUserMobile SET Mobile=? WHERE BranchUser_id=?`,[mobile,user_id],
       (error,result,feilds)=>{
        if(error){
          return callback(error)
        }
        return callback(null,result)
       }
    )
  },
  updateDob:(dob,user_id,callback)=>{
    pool.query(`UPDATE BranchUser SET DOB=? WHERE BranchUser_id=?`,[dob,user_id],
      (error,result,feilds)=>{
        if(error){
          return callback(error)
        }
        return callback(null,result)  
      }
     )
    
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
  },
  updateImageUrl:(user_id,imageUrl,callback)=>{
    pool.query(
      `UPDATE BranchUser SET profileImageUrl=? WHERE BranchUser_id=?`,
      [imageUrl,user_id],
      (error,result,feilds)=>{
        if(error){
          return callback(error)
        }
        console.log(result);
        return callback(null,result)
      }
    )
  },
  deleteImage:(user_id,callback)=>{
    pool.query(
      `UPDATE BranchUser SET profileImageUrl=NULL WHERE BranchUser_id=? `,[user_id],(error,result)=>{
        if(error){
          return callback(error);
        }
        else{
          return callback(null,result)
        }
      }
    )
  }
};
