const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { SendMail } = require("../modules/sendingEmail.js");
const {
  logInUserbyName,
  resetNewPassword,
  verifyEmail,
  getUsers,
  storeOtpInTable,
  verifyOtp,
  deleteOtp
} = require("../services/users.js");

module.exports = {
  getUsers: (req, res) => {
    getUsers((error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error.message,
        });
      }
      return res.json({
        success: 200,
        message: result,
      });
    });
  },
  verifyEmail: (req, res) => {
    const { name, email } = req.body;
    console.log(name);
    console.log(email);
    verifyEmail(name, (error, result) => {
      if (error) {
        return res.json({
          successs: 0,
          message: error,
        });
      }
      if (result.length == 0) {
        console.log("no result");
        return res.json({
          success: 101,
          message: "User not found",
        });
      }
      if (result) {
        console.log(result);
        if (result[0].Email == email) {
          SendMail(email, (err, result) => {
            if (err) {
              console.log(err);
              return res.json({
                success: 0,
                message: err,
              });
            }
            if (result) {
              console.log(result[1]);
              storeOtpInTable(email,result,(error,result)=>{
                if(error){
                  return res.json({
                    success:0,
                    message:error
                  })
                }else if(result.affectedRows>0){
                  return res.json({
                    success:200,
                    message:'successfully updated'
                  })  
                }else{
                  return res.json({
                    success:101,
                    message:'Try Again!'
                  })
                }
              })
            }
          });
        } else {
          return res.json({
            success: 101,
            message: "Email is not correct",
          });
        }
      }
    });
  },
  resendOtp: (req, res) => {
    const email=req.params.email
    SendMail(email, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      } else if (result.length !=0) {
        storeOtpInTable(email,result,(error,result)=>{
          if(error){
            return res.json({
              success:0,
              message:error
            })
          }else if(result.affectedRows>0){
            return res.json({
              success:200,
              message:'successfully updated'
            })  
          }else{
            return res.json({
              success:101,
              message:'Try Again!'
            })
          }
        })      
      }
      else{
        res.json({
          success:101,
          message:'Try Again!'
        })
      }
    });
  },
  resetForgotPassword: (req, res) => {
    const data = req.body;
    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);
    resetNewPassword(data.name, data.password, (error, result) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      }
      if (result) {
        return res.json({
          success: 200,
          message: result,
        });
      }
    });
  },
  logInUser: (req, res) => {
    //console.log("hello world");
    const { name, password } = req.body;
    //const name1=req.body.name;
    logInUserbyName(name, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result.length == 0) {
        return res.status.json({
          success: 101,
          message: "no user found",
        });
      }
      if (result) {
        const flag = compareSync(password, result[0].Password);
        if (flag) {
          // code for issuwing jwt token
          const jsonToken = sign(
            { userName: name },
            process.env.JWT_SECERET_KEY
          );
          return res.json({
            success: 200,
            message: result,
            token: jsonToken,
          });
        } else {
          return res.json({
            success: 101,
            message: "password incoreect",
          });
        }
      }
    });
  },
  resetPassword: (req, res) => {
    const data = req.body;
    const salt = genSaltSync(10);
    data.newpassword = hashSync(data.newpassword, salt);
    console.log(data.newpassword);
    logInUserbyName(data.userName, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
        const flag = compareSync(data.oldPassword, result[0].Password);
        if (flag) {
          resetNewPassword(data.userName, data.newpassword, (err, result) => {
            if (err) {
              return res.json({
                success: 0,
                message: err,
              });
            } else if (result) {
              console.log(result);
              return res.json({
                success: 200,
                message: result,
              });
            }
          });
        } else {
          return res.json({
            success: 101,
            message: "no user found",
          });
        }
      }
    });
  },
  verifyOtp:(req,res)=>{
    const email=req.params.email;
    const otp=req.params.otp;
    verifyOtp(email,(error,result)=>{
      if(error){
        res.json({
          success:0,
          message:error
        })
      }
      else if(result.length != 0){
        console.log(new Date(result[0].Expires_at).getTime()>=Date.now());
        if(new Date(result[0].Expires_at).getTime()>=Date.now()){
          if(result[0].Otp==otp){
            res.json({
              success:200,
              message:'sucessfully verified!'
            })
          }else{
            res.json({
              success:101,
              message:'Wrong OTP!'
            })
          }
        }
        else{
          res.json({
            success:101,
            message:'OTP has expired!'
          })
        }  
      }
      else{
        res.json({
          success:101,
          message:'Try Again!'
        })
      }
    })
  },
  deleteOtp:(req,res)=>{
    const email=req.params.email;
    deleteOtp(email,(error,result)=>{
      if(error){
        res.json({
          success:0,
          message:error
        })
      }else if(result.affectedRows>0){
        res.json({
          success:200,
          message:"successfully deleted!"
        })
      }else{
        res.json({
          success:101,
          message:"OTP doesn't deleted!"
        })
      }
    })
  }
};
