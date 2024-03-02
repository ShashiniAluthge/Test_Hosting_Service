const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    const { token } = req.body;
    console.log(token);
    if (token) {
      verify(token, process.env.JWT_SECERET_KEY, (err, decode) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      return res.json({
        success: 101,
        message: "No web token found",
      });
    }
  },
};
