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
  updateDob,
  storeOtpInTable,
  verifyOtp,
  deleteOtp,
  updateImageUrl,
  deleteImage
} = require("../services/users.js");
const uploadFile= require("../../config/awsS3Config.js");
const multer = require("multer");
const upload = multer({dest:"uploads/"})

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink)


module.exports = {
  getUsers: (req, res) => {
    getUsers((error, result) => {
      if (error) {
        console.log(`error is at getUsers: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
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
        console.log(`error is at verifyEmail : ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
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
              console.log(`error is at SendMail : ${err}`);
              return res.json({
                success: 0,
                message: "Internal Server Error",
              });
            }
            if (result) {
              console.log(result[1]);
              storeOtpInTable(email, result, (error, result) => {
                if (error) {
                  console.log(`error is at storeOtpInTable : ${error}`);
                  return res.json({
                    success: 0,
                    message: "Internal Server Error",
                  });
                } else if (result.affectedRows > 0) {
                  return res.json({
                    success: 200,
                    message: "successfully updated",
                  });
                } else {
                  console.log(result);
                  return res.json({
                    success: 101,
                    message: "Try Again!",
                  });
                }
              });
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
    const email = req.params.email;
    SendMail(email, (error, result) => {
      if (error) {
        console.log(`error is at SendMail : ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.length != 0) {
        storeOtpInTable(email, result, (error, result) => {
          if (error) {
            console.log(`error is at storeOtpInTable : ${error}`);
            return res.json({
              success: 0,
              message: "Internal Server Error",
            });
          } else if (result.affectedRows > 0) {
            return res.json({
              success: 200,
              message: "successfully updated",
            });
          } else {
            return res.json({
              success: 101,
              message: "Try Again!",
            });
          }
        });
      } else {
        res.json({
          success: 101,
          message: "Try Again!",
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
        console.log(`error is at resetNewPassword : ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.affectedRows > 0) {
        return res.json({
          success: 200,
          message: result,
        });
      } else {
        return res.json({
          success: 200,
          message: "Password Save Unsuccessfull",
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
        console.log(`error is at logInUserbyName: ${err}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
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
            message: "password incorrect",
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
        console.log(`error is at logInUserbyName: ${err}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      }
      if (result) {
        const flag = compareSync(data.oldPassword, result[0].Password);
        if (flag) {
          resetNewPassword(data.userName, data.newpassword, (err, result) => {
            if (err) {
              console.log(`error is at resetNewPassword: ${err}`);
              return res.json({
                success: 0,
                message: "Internal Server Error",
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
  getProfileDetails: (req, res) => {
    user_id = Number(req.params.user_id);
    console.log(user_id);
    getProfileDetails(user_id, (error, result) => {
      if (error) {
        console.log(`error is at getProfileDetails: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      }
      if(result){
        return res.json({
          success: 200,
          message: result,
        });
      }
    });
  },
  updateName: (req, res) => {
    const user_id = req.params.user_id;
    const { firstName, lastName } = req.body;
    updateName(firstName, lastName, user_id, (error, result) => {
      if (error) {
        console.log(`error is at updateName: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.affectedRows > 0) {
        console.log(result);
        return res.json({
          success: 200,
          message: "Name Updated Successfully!",
        });
      } else {
        return res.json({
          success: 101,
          message: "Update Not Successfull!",
        });
      }
    });
  },
  verifyOtp: (req, res) => {
    const email = req.params.email;
    const otp = req.params.otp;
    verifyOtp(email, (error, result) => {
      if (error) {
        console.log(`error is at verifyOtp: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.length != 0) {
        console.log(new Date(result[0].Expires_at).getTime() >= Date.now());
        if (new Date(result[0].Expires_at).getTime() >= Date.now()) {
          if (result[0].Otp == otp) {
            res.json({
              success: 200,
              message: "sucessfully verified!",
            });
          } else {
            res.json({
              success: 101,
              message: "Wrong OTP!",
            });
          }
        } else {
          res.json({
            success: 101,
            message: "OTP has expired!",
          });
        }
      } else {
        res.json({
          success: 101,
          message: "Try Again!",
        });
      }
    });
  },
  updateEmail: (req, res) => {
    const user_id = req.params.user_id;
    const email = req.body.email;

    updateEmail(email, user_id, (error, result) => {
      if (error) {
        console.log(`error is at updateEmail: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.affectedRows > 0) {
        console.log(result);
        return res.json({
          success: 200,
          message: "Email Updated Successfully!",
        });
      } else {
        return res.json({
          success: 101,
          message: "Update Not Successfull!",
        });
      }
    });
  },
  updateMobile: (req, res) => {
    const user_id = req.params.user_id;
    const mobile = req.body.mobile;

    updateMobile(mobile, user_id, (error, result) => {
      if (error) {
        console.log(`error is at updateMobile: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.affectedRows > 0) {
        return res.json({
          success: 200,
          message: "Mobile Number Updated Successfully!",
        });
      } else {
        return res.json({
          success: 101,
          message: "Update Not Successfull!",
        });
      }
    });
  },
  updateDob: (req, res) => {
    const user_id = req.params.user_id;
    const { currentDate } = req.body;

    updateDob(currentDate, user_id, (error, result) => {
      if (error) {
        console.log(`error is at updateDob: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.affectedRows > 0) {
        console.log("controller DOB ");
        return res.json({
          success: 200,
          message: "Birthday Updated Successfully!",
        });
      } else {
        return res.json({
          success: 101,
          message: "Update Not Successfull!",
        });
      }
    });
  },
  deleteOtp: (req, res) => {
    const email = req.params.email;
    deleteOtp(email, (error, result) => {
      if (error) {
        console.log(`error is at deleteOtp: ${error}`);
        return res.json({
          success: 0,
          message: "Internal Server Error",
        });
      } else if (result.affectedRows > 0) {
        res.json({
          success: 200,
          message: "successfully deleted!",
        });
      } else {
        res.json({
          success: 101,
          message: "OTP doesn't deleted!",
        });
      }
    });
  },
  uploadImage: async (req, res) => {
    console.log("im here");
    console.log(req.file);
    const result = await uploadFile(req.file);
    console.log(result);
    await unlinkFile(req.file.path); 
    const user_id = req.params.user_id;
    const imageUrl = result.Location;
    console.log(user_id,imageUrl)
    updateImageUrl(user_id,imageUrl,(error,result)=>{
      if(error){
        console.log(`error is at uploadImage: ${error}`)
        return res.json({
          success:0,
          message:'Internal Server Error!'
        })
      }
      else if(result.affectedRows>0){
        console.log(result);
        return res.json({
          success:200,
          message:"Image Successfully Updated!"
        })
      }
      else {
        console.log(result);
        return res.json({
          success:101,
          message:"Image Doesn't Updated!"
        })
      }
    })

  },
  deleteImage:(req,res)=>{
    const user_id = req.params.user_id;
    deleteImage(user_id,(error,result)=>{
      if(error){
        console.log(`error is at deleteImage: ${error}`);
        return res.json({
          success:0,
          message:"Internal Server Error!"
        })
      }
      else if (result.affectedRows > 0) {
        res.json({
          success: 200,
          message: "Image Successfully Deleted!",
        });
      } else {
        res.json({
          success: 101,
          message: "Image Doesn't Deleted!",
        });
      }
    })
  }
};
