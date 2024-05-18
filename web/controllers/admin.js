const {CheckUsernamePassword,AddAdmin} = require("../services/admin.js");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
AdminLogin: (req, res) => {
    CheckUsernamePassword(req.body.username, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "error",
        });
      }
      if (result.length == 0) {
        return res.json({
            success: 0,
            message: "invalid username",
          });
      }

      if (result) {
          if(compareSync(req.body.password, result[0].password)){
            return res.json({
              success: 1,
              message: "correct password",
            })
          }
          else{
          return res.json({
            success: 0,
            message: "incorrect password",
          });
        }
      }
    });
  },

AddAdmin: (req, res) => {
    const salt = genSaltSync(10);
    const username = req.body.username
    const Password = hashSync(req.body.password, salt);
    AddAdmin(username,Password,(err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
          return res.json({
            success: 1,
            message: "successfully added admin",
          });
      }
    });
  },
}