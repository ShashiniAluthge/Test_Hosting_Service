const {CheckUsernamePassword,AddAdmin} = require("../services/admin.js");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
AdminLogin: (req, res) => {
    const username = req.params.username
    CheckUsernamePassword(username, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "error",
        });
      }
      if (result.length == 0) {
        return res.json({
            success: 0,
            message: "Invalid Username",
          });
      }

      if (result) {
          return res.json({
            success: 1,
            message: "success",
          });
      }
    });
  },

AddAdmin: (req, res) => {
    const salt = genSaltSync(10);
    const username = req.body.username
    const Password = hashSync(req.body.password, salt);



    console.log(username)
    console.log(Password)

    AddAdmin(username,Password,(err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result.length == 0) {
        return res.json({
            success: 0,
            message: "Invalid Username",
          });
      }
      if (result) {
          return res.json({
            success: 1,
            message: "success",
          });
      }
    });
  },
}