const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { SendMail } = require("../modules/sendingEmail.js");
const {
  logInUserbyName,
  resetNewPassword,
  verifyEmail,
  getUsers,
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
    const { name, password } = req.body;
    logInUserbyName(name, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result.length == 0) {
        return res.json({
          success: 101,
          message: "no user found",
        });
      }
      if (result) {
        const flag = compareSync(password, result[0].Password);
        if (flag) {
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
};
