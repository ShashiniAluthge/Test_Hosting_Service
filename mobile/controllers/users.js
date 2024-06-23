const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { SendMail } = require("../modules/sendingEmail.js");
const {
  logInUserbyName,
  resetNewPassword,
  verifyEmail,
  getUsers,
  getProfileDetails,
  updateName,
  updateEmail,
  updateMobile,
  updateDob
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
              console.log(result);
              return res.json({
                success: 200,
                message: result,
              });
            }
          });
        } else {
          console.log("no email");
          return res.json({
            success: 101,
            message: "Email is not correct",
          });
        }
      }
    });
  },
  resendOtp: (req, res) => {
    console.log(req.body.email);
    SendMail(req.body.email, (error, result) => {
      if (error) {
        return res.json({
          success: 100,
          message: error,
        });
      } else if (result) {
        return res.json({
          success: 200,
          message: result,
        });
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
        return res.status(101).json({
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
  getProfileDetails:(req,res)=>{
    user_id = Number(req.params.user_id);
    console.log(user_id)
    getProfileDetails(user_id,(error,result)=>{
      if(error){
        return res.json({
          success:0,
          message:error.message
        })
      }
      return res.json({
        success:200,
        message:result
      })
    })
  },
  updateName:(req,res)=>{
    const user_id=req.params.user_id;
    const{firstName,lastName}=req.body;
    updateName(firstName,lastName,user_id,(error,result)=>{
      if(error){
        return res.json({
          success:0,
          message:error
        })
      }
      
      else if(result.affectedRows>0){
        console.log(result);
        return res.json({
          success:200,
          message:'update Successfull'
        })
      }
      else{
        return res.json({
          success:101,
          message:'update Not Successfull!'
        })
      }
    })
  },
  updateEmail:(req,res)=>{
    const user_id =req.params.user_id;
    const email=req.body.email;

    updateEmail(email,user_id,(error,result)=>{
      if(error){
        return res.json({
          success:0,
          message:error
        })
      }
      else if(result.affectedRows>0){
        console.log(result);
        return res.json({
          success:200,
          message:'update successfull'
        })
      }
      else{
        return res.json({
          success:101,
          message:'update not successfull'
        })
      }
    })
  },
  updateMobile:(req,res)=>{
    const user_id = req.params.user_id;
    const mobile = req.body.mobile

    updateMobile(mobile,user_id,(error,result)=>{
      if(error){
        return res.json({
          success:0,
          message:error
        })
      }
      else if(result.affectedRows>0){
        return res.json({
          success:200,
          message:'update successfully'
        })
      }
      else{
        return res.json({
          success:101,
          message:'not update successfully'
        })
      }
    })
  },
  updateDob:(req,res)=>{
    const user_id = req.params.user_id;
    const {currentDate} = req.body

    updateDob(currentDate,user_id,(error,result)=>{
      if(error){
        return res.json({
          success:0,
          message:error
        })
      }
      else if(result.affectedRows>0){
        console.log("controller DOB ")
        return res.json({
          success:200,
          message:'update successfully'
        })
      }
      else{
        return res.json({
          success:101,
          message:'not update successfully'
        })
      }
    })
  }
};
